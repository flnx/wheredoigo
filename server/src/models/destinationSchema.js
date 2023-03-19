const mongoose = require('mongoose');
const { cityCountryRegex } = require('../utils/utils');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    city: {
        type: String,
        trim: true,
        match: [
            cityCountryRegex(),
            '"City" should contain only letters, spaces, or hyphens',
        ],
        required: [true, 'City is required'],
        lowercase: true,
    },
    description: {
        type: String,
        trim: true,
        minLength: 10,
        required: [true, 'Description is required'],
    },
    details: [
        {
            category: {
                type: String,
                required: true,
                enum: ['goodToKnow', 'transport', 'localCustoms', 'proTips'],
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    imageUrls: [String],
});

destinationSchema.index(
    { city: 1, country: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
