const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');
const {
    destinationCategories,
    destinationDetails,
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
        minLength: [1, errorMessages.data.city],
        maxLength: [85, errorMessages.data.city],
        lowercase: true,
        required: [true, 'City is required'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [50, errorMessages.validation.description()],
        maxLength: [15000, errorMessages.validation.description()], // max is 5k without html, this is a backup if something fails
        required: true,
    },
    category: {
        type: [String], // Changed type to an array of strings
        trim: true,
        required: [true, errorMessages.data.category],
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
    likesCount: { type: Number, default: 0 },
    details: {
        type: [
            {
                name: {
                    type: String,
                    trim: true,
                    required: true,
                    unique: true,
                    enum: destinationDetails,
                },
                content: {
                    type: String,
                    trim: true,
                    default: '',
                    maxLength: [5000, errorMessages.validation.description(0, 2000)],
                },
            },
        ],
        required: true,
    },
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
