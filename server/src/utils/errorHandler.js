const capitalizeEachWord = require('./capitalizeWords');

function errorHandler(err, req, res, next) {
    if (err.name === 'SyntaxError') {
        res.status(400).json({ message: 'Invalid JSON payload' });
    } else if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map((error) => error.message);
        const error = errors[0];
        res.status(400).json({ message: error });
    } else if (err.name === 'CastError') {
        res.status(400).json({ message: 'Invalid ID format' });
    } else if (err.name === 'MongoError' && err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        res.status(400).json({
            message: `${capitalizeEachWord(key)} already exists`,
        });
    } else {
        res.status(err.status || 500).json({
            message: err.message || 'Internal server error',
            error: err,
        });
    }
}

module.exports = errorHandler;
