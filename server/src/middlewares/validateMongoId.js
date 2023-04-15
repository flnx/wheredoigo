const { isValid } = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
    const { id } = req.params;

    if (!isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID' });
    }

    next();
};