const capitalizeEachWord = require('./capitalizeWords');

function errorHandler(err, req, res, next) {
    switch (err.name) {
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
                    message: 'An error occurred',
                    error: err,
                });
            }
            break;
        default:
            res.status(err.status || 500).json({
                message: err.message || 'Internal server error',
                error: err,
            });
            break;
    }
}

module.exports = errorHandler;
