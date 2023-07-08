const { errorMessages } = require("../constants/errorMessages");
const { isObject } = require("../utils/utils");

function requireObjectBody (req, res, next) {
    if (!isObject(req.body)) {
        return res.status(400).json({ error: errorMessages.request.body });
    }

    next();
};

module.exports = {
    requireObjectBody,
};