const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validator = require('validator');
const { errorMessages } = require('../constants/errorMessages');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        minLength: [2, errorMessages.validation.username],
        maxLength: [12, errorMessages.validation.username],
        unique: [true, 'The username is already taken'],
        validate: [validator.isAlphanumeric, errorMessages.validation.username],
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: [true, 'The email address is already taken'],
        validate: [validator.isEmail, errorMessages.validation.email],
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required'],
    },
    avatarUrl: {
        type: String,
        default: 'https://supercharge.info/images/avatar-placeholder.png',
    },
    avatar_id: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator', 'traveller', 'commenter'],
        default: 'user',
    },
});

userSchema.virtual('capitalizedUsername').get(function () {
    return this.username.replace(/\b\w/g, (l) => l.toUpperCase());
});

userSchema.index({
    collation: {
        locale: 'en',
        strength: 2,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
