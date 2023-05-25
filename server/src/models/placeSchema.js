const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');
const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');

const placeSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    destinationId: {
        type: Schema.Types.ObjectId,
        required: [true, 'Destination id required!'],
        ref: 'Destination',
    },
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Place name is required!'],
    },
    country: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Country is required!'],
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'City is required!'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [50, errorMessages.description],
        maxLength: [5000, errorMessages.description],
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

placeSchema.index(
    { name: 1, destinationId: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
