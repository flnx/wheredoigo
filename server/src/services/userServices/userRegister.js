const bcrypt = require('bcrypt');

const User = require('../../models/userSchema');
const { generateUserToken } = require('../../utils/generateUserToken');

require('dotenv').config();

async function userRegister({ email, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    const accessToken = await generateUserToken(user);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        avatarUrl: user.avatarUrl,
        role: user.role,
        accessToken,
    };
}

module.exports = userRegister;
