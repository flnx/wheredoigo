const validator = require('validator');
const bcrypt = require('bcrypt');

const User = require('../../models/userSchema');

const { generateUserToken } = require('../../utils/generateUserToken');
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

    const accessToken = await generateUserToken(user) 

    return {
        email: user.email,
        username: user.capitalizedUsername,
        avatarUrl: user.avatarUrl,
        role: user.role,
        accessToken,
    };
}

module.exports = userLogin;
