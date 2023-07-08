const jwt = require('../lib/jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../constants/errorMessages');

require('dotenv').config();

async function checkSession(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.slice(7);

        try {
            const decodedToken = await jwt.verify(
                accessToken,
                process.env.JWT_SECRET
            );

            const { ownerId, role, username } = decodedToken;

            if (!ownerId || !isValid(ownerId) || !role || !username) {
                return unauthorizedResponse(res);
            }

            req.user = decodedToken;
        } catch (err) {
            return unauthorizedResponse(res);
        }
    } else {
        req.user = {};
    }

    next();
}

const unauthorizedResponse = (res) => {
    return res.status(401).json({ message: errorMessages.auth.unauthorized });
};

module.exports = {
    checkSession,
};