const validator = require('validator');
const bcrypt = require('bcrypt');

const User = require('../../models/userSchema');

const { validatePassword, isString } = require('../../utils/utils');
const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');
const { generateUserToken } = require('../../utils/generateUserToken');

require('dotenv').config();

async function userRegister({ email, username, password }) {
    if (!isString(email) || !isString(username) || !isString(password)) {
        throw createValidationError(errorMessages.validation.fieldsReq, 400);
    }

    const isPasswordValid = validatePassword(password);
    const hasValidLength = validator.isLength(username.trim(), { min: 2, max: 12 });

    if (!hasValidLength || !validator.isAlphanumeric(username)) {
        throw createValidationError(errorMessages.validation.username, 400);
    }

    if (!validator.isEmail(email)) {
        throw createValidationError(errorMessages.validation.email, 400);
    }

    if (isPasswordValid == false) {
        throw createValidationError(errorMessages.validation.password, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    const accessToken = await generateUserToken(user);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        avatarUrl: user.avatarUrl,
        role: user.role,
        accessToken,
    };
}

module.exports = userRegister;
