const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');
const {
    destinationCategories,
    destinationInfoCategories,
} = require('../constants/allowedDestinationCategories');

const destinationSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required: true,
    },
    city: {
        type: String,
        trim: true,
        minLength: [1, errorMessages.invalidCity],
        maxLength: [85, errorMessages.invalidCity],
        lowercase: true,
        required: [true, 'City is required'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [50, errorMessages.description],
        maxLength: [5000, errorMessages.description],
        required: true,
    },
    category: {
        type: [String], // Changed type to an array of strings
        trim: true,
        required: [true, errorMessages.selectCategory],
        enum: {
            values: destinationCategories,
            message: 'Invalid category',
        },
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
    details: [
        {
            category: {
                type: String,
                trim: true,
                required: true,
                enum: destinationInfoCategories,
            },
            info: [
                {
                    title: {
                        type: String,
                        trim: true,
                        required: true,
                    },
                    description: {
                        type: String,
                        trim: true,
                    },
                },
            ],
        },
    ],
    imageUrls: [
        {
            imageUrl: String,
            public_id: String,
        },
    ],
});

destinationSchema.index(
    { city: 1, country: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

destinationSchema.index({ likes: 1 });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
