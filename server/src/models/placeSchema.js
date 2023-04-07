const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const placeSchema = new Schema({
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
        minLength: [10, 'Description must contain at least 10 characters'],
        required: [true, 'Description is required'],
    },
    type: {
        type: String,
        trim: true,
        enum: ['Explore', 'Eat', 'Party'],
        required: [true, 'Type is required'],
    },
    imageUrls: {
        type: [String],
    },
});

placeSchema.index(
    { name: 1, destinationId: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
