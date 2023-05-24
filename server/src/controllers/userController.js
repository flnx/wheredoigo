const deleteUserAccount = require('../services/userServices/deleteUserAccount');
const updateUserAvatar = require('../services/userServices/updateUserAvatar');
const userDashboardData = require('../services/userServices/userDashboardData');
const getUserLastActivities = require('../services/userServices/userLastActivities');
const userLogin = require('../services/userServices/userLogin');
const userRegister = require('../services/userServices/userRegister');

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

const get_last_activities = async (req, res, next) => {
    const { ownerId } = req.user;

    try {
        const promises = [
            getUserLastActivities(ownerId),
            userDashboardData(ownerId),
        ];

        const [lastActivities, dashboardData] = await Promise.all(promises);

        res.json({
            ...lastActivities,
            ...dashboardData,
        });
    } catch (err) {
        next(err);
    }
};

const delete_user_account = async (req, res, next) => {
    try {
        const result = await deleteUserAccount(req.user);

        res.json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    register,
    change_avatar,
    get_last_activities,
    delete_user_account
};
