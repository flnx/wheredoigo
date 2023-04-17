const { isValid } = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
    const { id } = req.params;
    const { commentId } = req.query;

    if (!isValid(id)) {
        return res.status(404).json({ message: 'Invalid ID' });
    }

    if (commentId && !isValid(commentId)) {
        return res.status(404).json({ message: 'Invalid Comment ID' });
    }

    next();
};
