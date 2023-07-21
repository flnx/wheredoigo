const yup = require('yup');
const validator = require('validator');
const DOMPurify = require('../../config/domPurify');

const { errorMessages } = require('../../constants/errorMessages');
const { createValidationError } = require('../createValidationError');

const sanitizeHtmlSchema = yup.object({
    htmlStr: yup.string(),
    min: yup.number().integer(),
    max: yup.number().integer(),
});

function sanitizeHtmlString(htmlStr, min = 50, max = 5000) {
    sanitizeHtmlSchema.validateSync({ htmlStr, min, max });
    if (!htmlStr) return htmlStr;

    const clean = sanitizeHtml(htmlStr);
    const plainText = removeTagsAndGetLength(clean);

    // Check required min/max content length
    if (!validator.isLength(plainText.trim(), { min, max })) {
        throw createValidationError(
            errorMessages.validation.description(min, max),
            400
        );
    }

    return clean;
}

function removeTagsAndGetLength(str) {
    const plainText = DOMPurify.sanitize(str, { ALLOWED_TAGS: [] });
    return plainText;
}

function sanitizeHtml(htmlStr) {
    const clean = DOMPurify.sanitize(htmlStr, {
        ALLOWED_TAGS: ['h2', 'h3', 'h4', 'b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'p', 'br'],
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
    });

    return clean;
}

module.exports = {
    sanitizeHtmlString,
};
