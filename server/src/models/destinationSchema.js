const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { errorMessages } = require('../constants/errorMessages');

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
    details: [
        {
            category: {
                type: String,
                trim: true,
                required: true,
                enum: [
                    'Good to Know',
                    'Transport',
                    'Local Customs',
                    'Pro Tips',
                ],
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
