const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { validatePassword } = require('../utils/utils');
const { errorMessages } = require('../constants/errorMessages');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
const { avatarOptions } = require('../config/cloudinary');

require('dotenv').config();

async function userRegister({ email, username, password }) {
    if (!email || !username || !password) {
        throw Error(errorMessages.allFieldsRequired);
    }

    const isPasswordValid = validatePassword(password);

    if (isPasswordValid == false) {
        throw new Error(errorMessages.password);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    const payload = {
        ownerId: user._id,
        username: capitalizeEachWord(user.username),
        email,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
        avatarUrl: user.avatarUrl,
    };
}

async function userLogin({ email, password }) {
    if (!email || !password) {
        throw Error(errorMessages.auth);
    }

    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
        throw new Error(errorMessages.auth);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isPasswordMatch == false) {
        throw new Error(errorMessages.auth);
    }

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: capitalizeEachWord(user.username),
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
        avatarUrl: user.avatarUrl,
    };
}

const updateUserAvatar = async (image, userData) => {
    const user = await User.findById(userData.ownerId);

    if (!user) {
        throw new Error('User not found');
    }

    const imageData = await handleImageUploads([image], avatarOptions);
    const newImageUrl = imageData[0].url;

    user.avatarUrl = newImageUrl;
    await user.save();

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: capitalizeEachWord(user.username),
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
        avatarUrl: newImageUrl,
    };
};

module.exports = {
    userRegister,
    userLogin,
    updateUserAvatar,
};
