const { errorMessages } = require('../constants/errorMessages');
const { isValid } = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
    const { id } = req.params;


    if (!id || !isValid(id)) {
        return res.status(404).json({ message: errorMessages.notFound });
    }

    next();
};
