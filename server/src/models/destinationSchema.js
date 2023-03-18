const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capitalizeEachWord = require('../utils/capitalizeWords');
const validateKeys = require('../utils/schemaDetailsValidator');

const regex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;

const detailsSchema = new Schema({
    category: {
        type: String,
        enum: ['goodToKnow', 'transport', 'localCustoms', 'proTips'],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const destinationSchema = new Schema({
    country: {
        type: String,
        trim: true,
        match: [
            regex,
            '"Country" should contain only letters, spaces, or hyphens',
        ],
        required: [true, 'Country is required'],
        set: capitalizeEachWord,
    },
    city: {
        type: String,
        trim: true,
        match: [
            regex,
            '"City" should contain only letters, spaces, or hyphens',
        ],
        required: [true, 'City is required'],
        set: capitalizeEachWord,
    },
    description: {
        type: String,
        trim: true,
        minLength: 10,
        required: [true, 'Description is required'],
    },
    details: {
        type: [detailsSchema],
    },
    imageUrls: [String],
});

destinationSchema.index(
    // { _ownedCrypto: 1 },
    {
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;

// validate: [validator.isEmail, 'Invalid Email Address'],
