const userService = require('../services/userService');
const handleErrors = require('../utils/errorHandler');


const login = async (req, res) => {
    res.send('hi from login post');
};

const register = async (req, res) => {
    try {
        const userData = await userService.register(req.body);
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: handleErrors(err) });
    }
};

module.exports = {
    login,
    register,
};
