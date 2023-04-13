const jwt = require('../lib/jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.slice(7);

        try {
            const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);

            req.user = decodedToken;
            req.isAuthenticated = true;

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
