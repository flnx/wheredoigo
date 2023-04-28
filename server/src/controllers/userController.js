const updateUserAvatar = require("../services/userServices/updateUserAvatar");
const userLogin = require("../services/userServices/userLogin");
const userRegister = require("../services/userServices/userRegister");

const login = async (req, res, next) => {
    try {
        const userData = await userLogin(req.body);
        res.json(userData);
    } catch (err) {
        next(err);
    }
};

const register = async (req, res, next) => {
    try {
        const userData = await userRegister(req.body);
        res.json(userData);
    } catch (err) {
        next(err);
    }
};

const change_avatar = async (req, res, next) => {
    try {
        const updatedUserData = await updateUserAvatar(req.file, req.user);
        res.json(updatedUserData);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    register,
    change_avatar,
};
