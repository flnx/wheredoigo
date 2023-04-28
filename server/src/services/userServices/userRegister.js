const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jsonwebtoken');

const User = require('../../models/userSchema');

const { validatePassword, isString } = require('../../utils/utils');
const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');

require('dotenv').config();

async function userRegister({ email, username, password }) {
    if (!isString(email) || !isString(username) || !isString(password)) {
        throw createValidationError(errorMessages.auth, 400);
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

module.exports = userRegister;
