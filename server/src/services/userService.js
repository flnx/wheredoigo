const User = require('../models/userSchema');

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { avatarOptions } = require('../config/cloudinary');
const { validatePassword } = require('../utils/utils');
const { handleImageUploads, deleteImage } = require('../utils/cloudinaryUploader');
const { createValidationError } = require('../utils/createValidationError');
const { errorMessages } = require('../constants/errorMessages');

require('dotenv').config();

async function userRegister({ email, username, password }) {
    if (!email || !username || !password) {
        throw createValidationError(errorMessages.allFieldsRequired, 400);
    }

    const isPasswordValid = validatePassword(password);

    if (username.length < 2 || !validator.isAlphanumeric(username)) {
        throw createValidationError(errorMessages.username, 400);
    }

    if (!validator.isEmail(email)) {
        throw createValidationError(errorMessages.invalidEmail, 400);
    }

    if (isPasswordValid == false) {
        throw createValidationError(errorMessages.password, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: capitalizeEachWord(user.username),
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: capitalizeEachWord(user.username),
        accessToken,
        avatarUrl: user.avatarUrl,
    };
}

async function userLogin({ email, password }) {
    if (!email || !password) {
        throw createValidationError(errorMessages.auth, 400);
    }

    const isPasswordValid = validatePassword(password);

    if (!validator.isEmail(email) || isPasswordValid == false) {
        throw createValidationError(errorMessages.auth, 400);
    }

    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
        throw createValidationError(errorMessages.auth, 400);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isPasswordMatch == false) {
        throw createValidationError(errorMessages.auth, 400);
    }

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: capitalizeEachWord(user.username),
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: capitalizeEachWord(user.username),
        accessToken,
        avatarUrl: user.avatarUrl,
    };
}

const updateUserAvatar = async (image, jwtToken) => {
    const user = await User.findById(jwtToken.ownerId).exec();

    if (!user) {
        throw createValidationError(errorMessages.accessDenied, 401);
    }

    if (user.avatar_id) {
        await deleteImage(user.avatar_id);
    }

    const imageData = await handleImageUploads([image], avatarOptions);
    const { url, public_id } = imageData[0];

    user.avatarUrl = url;
    user.avatar_id = public_id;
    await user.save();

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: capitalizeEachWord(user.username),
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: capitalizeEachWord(user.username),
        accessToken,
        avatarUrl: url,
    };
};

module.exports = {
    userRegister,
    userLogin,
    updateUserAvatar,
};
