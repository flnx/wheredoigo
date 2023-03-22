const capitalizeEachWord = require("./capitalizeWords");

function handleErrors(err) {
    if (err.name == 'ValidationError') {
        return Object.keys(err.errors).map((key) => {
            return {
                [key]: err.errors[key].message,
            };
        });
    } else if (err.code == 11000 && 'MongoServerError') {
        let key = Object.keys(err.keyValue)[0];
        key = capitalizeEachWord(key);

        return `${key} is already taken`;
    } else if (err.name == 'CastError') {
        return 'ID Not Found';
    } else {
        return err.message;
    }
}

module.exports = handleErrors;
