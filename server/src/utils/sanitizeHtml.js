const DOMPurify = require('../config/domPurify');
const { isString } = require('./utils');

function sanitizeHtml(htmlStr) {
    if (!htmlStr || !isString(htmlStr)) {
        return htmlStr;
    }

    const clean = DOMPurify.sanitize(htmlStr, {
        ALLOWED_TAGS: [
            'h2',
            'h3',
            'h4',
            'b',
            'strong',
            'i',
            'em',
            'ul',
            'ol',
            'li',
            'p',
            'br',
        ], // Allowed tags
        ALLOWED_ATTR: [],
        ALLOW_DATA_ATTR: false,
    });

    return clean;
}

module.exports = {
    sanitizeHtml,
};
