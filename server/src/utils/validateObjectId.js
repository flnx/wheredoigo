const { ObjectId } = require('mongoose').Types;

function validateObjectId(id) {
    if (!ObjectId.isValid(id)) {
        const error = new Error('Invalid ID');
        error.status = 404;
        throw error;
    }
}

module.exports = {
    validateObjectId,
};
