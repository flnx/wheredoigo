const validateData = (schema) => async (req, res, next) => {
    const body = req.body;

    try {
        await schema.validate(body);
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    validateData,
};
