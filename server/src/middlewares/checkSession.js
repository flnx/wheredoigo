const jwt = require('../lib/jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;

require('dotenv').config();

async function checkSession(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.slice(7);

        try {
            const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
            const { ownerId } = decodedToken;

            if (!ownerId || !isValid(ownerId)) {
                return res.status(401).json({ message: 'User Not Found' });
            }

            req.user = decodedToken;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
    }

    next();
}
module.exports = {
    checkSession,
};
