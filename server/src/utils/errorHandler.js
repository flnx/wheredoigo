function handleErrors(err) {
    if (err.name == 'ValidationError') {
        return Object.keys(err.errors).map((key) => err.errors[key].message);
    } else if (err.code == 11000 && 'MongoServerError') {
        const key = Object.keys(err.keyValue)[0];

        return [`${key} is already taken`];
    } else {
        return [err.message];
    }
}

module.exports = handleErrors;
