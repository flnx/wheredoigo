const regex = Object.freeze({
    // Min 8 chars, at least 1 letter and 1 num (special chars allowed)
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+.]{8,}$/,
    username: /^[a-zA-Z0-9]+$/, // Alpha numeric username
});

module.exports = regex;
