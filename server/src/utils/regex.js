const regex = Object.freeze({
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Min 8 chars, at least 1 letter and 1 num
    username: /^[a-zA-Z0-9]+$/, // Alpha numeric username
});

module.exports = regex;
