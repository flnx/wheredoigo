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
        minLength: [10, errorMessages.description],
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
            imageUrl: String,
            public_id: String,
        },
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
    rating: {
        totalPlaceRates: {
            type: Number,
            default: 0,
        },
        totalSumOfRateValues: {
            type: Number,
            default: 0,
        },
        average: {
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

// Notes /Rating/ (Delete it when finished)

// - sum(rating) / total people

// Calculate rating update
// 1 - find the comment rating id (this happens outside the placeSchema with B tree indexing which will be O(log n)

// Efficient operation with O(1) time complexity to recalculate total rating:

// 2 - subtract the rating value from totalSumOfRateValues
// 3 - add the new rate value to totalSumOfRateValues
// 4 - recalc average

// Example: 

// 5 people rated - [5, 5, 4, 4, 2]
// total sum: 20

// 20 / 5 = 4
// average rating: 4

// index 0 has changed changed to 3
// new sum = 18
// recalc avg = 18 / 5 = 3.6
