const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { errorMessages } = require('../constants/errorMessages');
const { validatePassword } = require('../utils/utils');
const { handleImageUploads, deleteImage } = require('../utils/cloudinaryUploader');
const { avatarOptions } = require('../config/cloudinary');
const capitalizeEachWord = require('../utils/capitalizeWords');

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

    await deleteImage(user.avatar_id);
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
        ...payload,
        accessToken,
        avatarUrl: url,
    };
};

module.exports = {
    userRegister,
    userLogin,
    updateUserAvatar,
};
