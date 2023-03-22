const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
require('dotenv').config();

const { validatePassword } = require('../utils/utils');
const { errorMessages } = require('../constants/errorMessages');
const capitalizeEachWord = require('../utils/capitalizeWords');

async function register({ email, username, password }) {
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
        username: capitalizeEachWord(user.username)
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,

    };
}

async function login({ email, password }) {
    if (!email || !password) {
        throw Error(errorMessages.auth);
    }

    const user = await User.findOne({ email })
        .lean()
        .exec();

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
        username: capitalizeEachWord(user.username)
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
    };
}

module.exports = {
    register,
    login,
};
