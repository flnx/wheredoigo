const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { cityCountryRegex } = require('../utils/utils');

const placeSchema = new Schema({
    destinationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Destination',
    },
    country: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Country',
    },
    city: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [
            cityCountryRegex(),
            '"City" should contain only letters, spaces, or hyphens',
        ],
    },
    description: {
        type: String,
        trim: true,
        minLength: [10, 'Description must contain at least 10 characters'],
        required: [true, 'Description is required'],
    },
    place: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    imageUrls: {
        type: [String],
    },
});

placeSchema.index(
    { place: 1, city: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
