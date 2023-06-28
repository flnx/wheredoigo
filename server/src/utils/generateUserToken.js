const jwt = require('../lib/jsonwebtoken');
require('dotenv').config();

async function generateUserToken(user) {
    const payload = {
        ownerId: user._id,
        email: user.email,
        username: user.capitalizedUsername,
        role: user.role,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return accessToken;
}

module.exports = {
    generateUserToken,
};
