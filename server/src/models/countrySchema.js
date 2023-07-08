const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { errorMessages } = require('../constants/errorMessages');

const countrySchema = new Schema({
    name: {
        type: String,
        trim: true,
        minLength: [4, errorMessages.data.city],
        maxLength: [56, errorMessages.data.city],
        lowercase: true,
        required: [true, 'Country is required'],
        unique: true,
    },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
