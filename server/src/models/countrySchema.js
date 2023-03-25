const mongoose = require('mongoose');
const { cityCountryRegex } = require('../utils/utils');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        match: [cityCountryRegex(), '"Country" should contain only letters, spaces, or hyphens'],
        required: [true, 'Country is required'],
        unique: true,
    },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
