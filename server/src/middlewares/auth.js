const jwt = require('../lib/jsonwebtoken');
const { isValid } = require('mongoose').Types.ObjectId;

require('dotenv').config();

const auth = async (req, res, next) => {
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
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    auth,
};
