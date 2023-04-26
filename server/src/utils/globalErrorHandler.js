const handleErrors = require("./errorHandler");

function globalErrorHandler(err, req, res, next) {
    res.status(err.status || 500).json(handleErrors(err));
}