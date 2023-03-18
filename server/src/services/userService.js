const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');

require('dotenv').config();

async function register({ email, username, password }) {
    if (!password || password.length < 6) {
        throw Error('Password must be at least 6 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword,
    });

    const payload = {
        ownerId: user._id,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
    };
}

async function login({ email, password }) {
    if (!email || !password || password.length < 6) {
        throw Error('Invalid email address or password');
    }

    const user = await User.findOne({ email: email })
        .select('_id hashedPassword')
        .lean()
        .exec();

        const isPasswordMatch = await bcrypt.compare(password, user?.hashedPassword);
        
    if (!user || !isPasswordMatch) {
        throw new Error('Invalid email address or password');
    }

    const payload = {
        ownerId: user._id,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        ...payload,
        accessToken,
    };
}

module.exports = {
    register,
    login,
};
