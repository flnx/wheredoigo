const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minLength: [2, 'Username must be at least 2 characters long'],
        unique: [true, 'The username is already taken'],
        required: [true, 'Username is required'],
        validate: [
            validator.isAlphanumeric,
            'Username must contain only numbers and letters',
        ],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: [true, 'Email is required'],
        unique: [true, 'The email address is already taken'],
        validate: [validator.isEmail, 'Invalid Email Address'],
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required'],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
