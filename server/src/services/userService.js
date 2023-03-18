const User = require('../models/userSchema');

async function register({ email, username, password }) {
    console.log(email, username, password);

    if (password.length < 6) {
        throw Error('Password must be at least 6 characters long');
    }

    const user = await User.create({
        email,
        username,
        hashedPassword: password,
    });

    return {
        _id: user._id,
    };
}

module.exports = {
    register,
};
