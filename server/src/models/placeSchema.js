const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { errorMessages } = require('../constants/errorMessages');

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
        enum: ['Explore', 'Eat', 'Party'],
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
});

placeSchema.index(
    { name: 1, destinationId: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
