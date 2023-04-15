const handleErrors = require('../utils/errorHandler');
const {
    userLogin,
    userRegister,
    updateUserAvatar,
} = require('../services/userService');

const login = async (req, res) => {
    try {
        const userData = await userLogin(req.body);

        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: handleErrors(err) });
    }
};

const register = async (req, res) => {
    try {
        const userData = await userRegister(req.body);

        res.json(userData);
    } catch (err) {
        res.status(err.status || 400).json({ message: handleErrors(err) });
    }
};

const change_avatar = async (req, res) => {
    try {
        const updatedUserData = await updateUserAvatar(req.file, req.user);
        res.json(updatedUserData);
    } catch (err) {
        res.status(err.status || 400).json({ message: handleErrors(err) });
    }
};

module.exports = {
    login,
    register,
    change_avatar,
};
