const userService = require('../services/userService');
const handleErrors = require('../utils/errorHandler');

const login = async (req, res) => {
    try {
        const userData = await userService.login(req.body);
        
        res.json(userData);
    } catch (err) {
        console.error(handleErrors(err));
        res.status(401).json({ errors: handleErrors(err) });
    }
};

const register = async (req, res) => {
    try {
        const userData = await userService.register(req.body);

        res.json(userData);
    } catch (err) {
        // console.error(handleErrors(err));
        res.status(401).json({ errors: handleErrors(err) });
    }
};

module.exports = {
    login,
    register,
};
