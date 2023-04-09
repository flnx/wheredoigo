const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Country is required'],
        unique: true,
    },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
