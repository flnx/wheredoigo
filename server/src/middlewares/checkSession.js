const jwt = require('../lib/jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;

async function checkSession(req, res, next) {
    const token = req.headers['authorization'];

    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const { ownerId } = decodedToken;

            if (!ownerId || !isValid(ownerId)) {
                return res.status(401).json({ message: 'User Not Found' });
            }

            req.user = decodedToken.user;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
    }

    next();
}
module.exports = {
    checkSession,
};
