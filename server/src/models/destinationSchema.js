const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');
const {
    destinationCategories,
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
        lowercase: true,
        required: [true, 'City is required'],
    },
    description: {
        type: String,
        trim: true,
        minLength: [10, errorMessages.description],
        maxLength: [5000, errorMessages.description],
    },
    category: {
        type: String,
        trim: true,
        enum: destinationCategories,
    },
    likes: [
        {
            userId: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                required: true,
            },
        },
    ],
    details: [
        {
            category: {
                type: String,
                trim: true,
                required: true,
                enum: ['Good to Know', 'Transport', 'Local Customs', 'Pro Tips'],
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

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
