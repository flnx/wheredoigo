const bodyParserErrorHandler = () => {
    return (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            console.error('Invalid JSON data:', err.message);
            res.status(err.status).json({
                message: 'Dude, you messed up the JSON',
            });
        } else {
            next();
        }
    };
};

module.exports = bodyParserErrorHandler;
