const jwt = require('../lib/jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../constants/errorMessages');

require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return unauthorizedResponse(res);
    }

    const accessToken = authHeader.slice(7);

    try {
        const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
        const { ownerId, role } = decodedToken;

        if (!ownerId || !isValid(ownerId) || !role) {
            return unauthorizedResponse(res);
        }

        req.user = decodedToken;
        next();
    } catch (err) {
        return unauthorizedResponse(res);
    }
};

const unauthorizedResponse = (res) => {
    return res.status(401).json({ message: errorMessages.auth.unauthorized });
};

module.exports = {
    auth,
};
