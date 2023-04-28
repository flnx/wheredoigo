const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('../../lib/jsonwebtoken');

const User = require('../../models/userSchema');

const { validatePassword, isString } = require('../../utils/utils');
const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');

require('dotenv').config();

async function userLogin({ email, password }) {
    if (!isString(email) || !isString(password)) {
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

module.exports = userLogin;
