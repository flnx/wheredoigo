const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { cityCountryRegex } = require('../utils/utils');

const citySchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
            cityCountryRegex(),
            '"City" should contain only letters, spaces, or hyphens',
        ],
        required: [true, 'City is required'],
        unique: true,
    },
});

const City = mongoose.model('City', citySchema);

module.exports = City;
