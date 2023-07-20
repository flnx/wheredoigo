const validator = require('validator');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../createValidationError');
const { removeTagsAndGetLength } = require('../removeTagsAndGetLength');
const { sanitizeHtml } = require('../sanitizeHtml');
const { isString } = require('../utils');

function sanitizeHtmlString(htmlStr, min = 50, max = 5000) {
    if (!isString(htmlStr)) {
        throw createValidationError(errorMessages.form.string('Description'), 400);
    }

    const sanitizedHtmlStr = sanitizeHtml(htmlStr);
    const plainText = removeTagsAndGetLength(sanitizedHtmlStr);

    if (!validator.isLength(plainText.trim(), { min, max })) {
        throw createValidationError(
            errorMessages.validation.description(min, max),
            400
        );
    }

    return sanitizedHtmlStr;
}

module.exports = {
    sanitizeHtmlString,
};
