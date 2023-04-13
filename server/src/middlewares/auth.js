const jwt = require('../lib/jsonwebtoken');
const User = require('../models/userSchema');

require('dotenv').config();

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.slice(7);

        try {
            const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);

            const user = await User.findById(decodedToken.ownerId).exec();

            if (!user) {
                return res.status(401).json({ message: 'User Not Found' });
            }

            req.user = user;

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
