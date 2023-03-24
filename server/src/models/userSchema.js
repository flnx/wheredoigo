const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');
const { errorMessages } = require('../constants/errorMessages');
errorMessages;

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minLength: [3, errorMessages.username],
        unique: [true, 'The username is already taken'],
        required: [true, 'Username is required'],
        validate: [validator.isAlphanumeric, errorMessages.username],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email address is required'],
        unique: [true, 'The email address is already taken'],
        validate: [validator.isEmail, errorMessages.invalidEmail],
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required'],
    },
});

userSchema.index(
    {
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
