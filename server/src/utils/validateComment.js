const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');
const { isString, isValidInteger } = require('./utils');

function validateCommentFields({ content, title, rating }) {
    if (!isString(content) || content.length < 10) {
        throw createValidationError(errorMessages.invalidComment, 400);
    }

    if (!isString(title) || title.length < 2) {
        throw createValidationError(errorMessages.commentTitle, 400);
    }

    if (!isValidInteger(rating) || rating < 0 || rating > 5) {
        throw createValidationError(400, errorMessages.invalidRating);
    }
}

module.exports = {
    validateCommentFields,
};
