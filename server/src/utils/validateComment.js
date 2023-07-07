const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');
const { isString, isValidInteger } = require('./utils');

function validateCommentFields({ content, title, rating }) {
    if (!isString(content) || content.length < 10) {
        throw createValidationError(errorMessages.validation.comment.body, 400);
    }

    if (!isString(title) || title.length < 2) {
        throw createValidationError(errorMessages.validation.comment.title, 400);
    }

    if (!isValidInteger(rating) || rating < 1 || rating > 5) {
        throw createValidationError(errorMessages.invalidRating, 500);
    }
}

module.exports = {
    validateCommentFields,
};
