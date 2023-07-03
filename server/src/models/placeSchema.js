const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');
const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');
const { createValidationError } = require('../utils/createValidationError');
const capitalizeEachWord = require('../utils/capitalizeWords');

const placeSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destinationId: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        required: [true, 'Destination id is required!'],
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [1, errorMessages.placeName],
        maxLength: [60, errorMessages.placeName],
        required: [true, 'Place name is required!'],
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [4, errorMessages.invalidCountry],
        maxLength: [56, errorMessages.invalidCountry],
        required: [true, 'Country is required!'],
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
        minLength: [1, errorMessages.invalidCity],
        maxLength: [85, errorMessages.invalidCity],
        required: [true, 'City is required!'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [50, errorMessages.description],
        maxLength: [5000, errorMessages.description],
        required: [true, errorMessages.description],
    },
    type: {
        type: String,
        trim: true,
        enum: allowedPlaceCategories,
        required: [true, 'Type is required'],
    },
    imageUrls: [
        {
            imageUrl: {
                type: String,
                required: true,
            },
            public_id: {
                type: String,
                required: true,
            },
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    commentedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    rating: {
        numRates: {
            type: Number,
            default: 0,
        },
        sumOfRates: {
            type: Number,
            default: 0,
        },
    },
});

placeSchema.virtual('averageRating').get(function () {
    const { rating } = this;
    const { sumOfRates, numRates } = rating;
    return +(sumOfRates / numRates).toFixed(2) || 0;
});

placeSchema.virtual('capitalizedName').get(function () {
    return capitalizeEachWord(this.name);
});

placeSchema.virtual('capitalizedCity').get(function () {
    return capitalizeEachWord(this.city);
});

placeSchema.virtual('capitalizedCountry').get(function () {
    return capitalizeEachWord(this.country);
});

placeSchema.virtual('mainImage').get(function () {
    return this.imageUrls.length > 0 ? this.imageUrls[0].imageUrl : null;
});

placeSchema.statics.updatePlaceCommentsAndRating = async function (
    id,
    ownerId,
    comment,
    numRate,
    rating
) {
    const updatedPlace = await this.findOneAndUpdate(
        { _id: id, commentedBy: { $ne: ownerId } },
        {
            $push: {
                comments: comment._id,
                commentedBy: ownerId,
            },
            $inc: {
                'rating.numRates': numRate,
                'rating.sumOfRates': rating,
            },
        },
        { new: true }
    )
        .select('rating')
        .lean()
        .exec();

    if (!updatedPlace) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    return updatedPlace;
};

placeSchema.index(
    { name: 1, destinationId: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
