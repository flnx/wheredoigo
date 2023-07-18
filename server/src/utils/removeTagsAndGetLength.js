const DOMPurify = require('../config/domPurify');

function removeTagsAndGetLength(str) {
    if (!str) {
        return str;
    }

    const plainText = DOMPurify.sanitize(str, { ALLOWED_TAGS: [] });
    return plainText;
}

module.exports = {
    removeTagsAndGetLength,
};
