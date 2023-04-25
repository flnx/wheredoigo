const User = require('../models/userSchema');

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

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
        username: user.capitalizedUsername,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: user.capitalizedUsername,
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

    const user = await User.findOne({ email }).exec();

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
        username: user.capitalizedUsername,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        accessToken,
        avatarUrl: user.avatarUrl,
    };
}

const updateUserAvatar = async (image, jwtToken) => {
    const user = await User.findById(jwtToken.ownerId).exec();

    if (!user) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!image) {
        throw createValidationError(errorMessages.invalidImages);
    }

    const promises = [
        handleImageUploads([image], avatarOptions),
        deleteImage(user.avatar_id),
    ];

    const [imageData, _] = await Promise.allSettled(promises);

    if (imageData.status !== 'fulfilled') {
        throw createValidationError(errorMessages.uploadError, 500)
    }

    const { url, public_id } = imageData.value[0];

    user.avatarUrl = url;
    user.avatar_id = public_id;
    await user.save();

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: user.capitalizedUsername,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        accessToken,
        avatarUrl: url,
    };
};

module.exports = {
    userRegister,
    userLogin,
    updateUserAvatar,
};
