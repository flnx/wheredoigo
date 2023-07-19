const DOMPurify = require('../config/domPurify');
const { isString } = require('./utils');

function removeTagsAndGetLength(str) {
    if (!str || !isString(str)) {
        return str;
    }

    const plainText = DOMPurify.sanitize(str, { ALLOWED_TAGS: [] });
    return plainText;
}

module.exports = {
    removeTagsAndGetLength,
};
