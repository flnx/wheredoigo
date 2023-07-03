const User = require('../../models/userSchema');

async function getCommenters() {
    return User.find({ role: 'commenter' }).select('_id').exec();
}

module.exports = {
    getCommenters,
};
