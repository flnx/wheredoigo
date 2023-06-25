const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { errorMessages } = require('../constants/errorMessages');

const countrySchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: [4, errorMessages.invalidCity],
        maxLength: [56, errorMessages.invalidCity],
        lowercase: true,
        required: [true, 'Country is required'],
        unique: true,
    },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
