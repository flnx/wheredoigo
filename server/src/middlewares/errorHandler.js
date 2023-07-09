const { errorMessages } = require('../constants/errorMessages');
const capitalizeEachWord = require('../utils/capitalizeWords');

function errorHandler(err, req, res, next) {
    console.info(err.name);
    console.error(err.message || err);
    switch (err.name) {
        case 'MulterError':
            if (err.code == 'LIMIT_UNEXPECTED_FILE') {
                next(err);
            } else {
                res.status(400).json({
                    message: err.message || errorMessages.request.upload,
                });
            }
            break;
        case 'SyntaxError':
            res.status(400).json({ message: 'Invalid JSON payload' });
            break;
        case 'ValidationError':
            const errors = Object.values(err.errors).map((error) => error.message);
            const error = errors[0];
            res.status(400).json({ message: error });
            break;
        case 'CastError':
            res.status(400).json({ message: 'Invalid ID format' });
            break;
        case 'MongoServerError':
            if (err.code === 11000) {
                const key = Object.keys(err.keyValue)[0];
                res.status(400).json({
                    message: `${capitalizeEachWord(key)} already exists`,
                });
            } else {
                res.status(500).json({
                    message: err.message || errorMessages.request.server,
                    error: err,
                });
            }
            break;
        default:
            res.status(err.status || 500).json({
                message: err.message || errorMessages.request.server,
                error: err,
            });
            break;
    }
}

module.exports = errorHandler;
