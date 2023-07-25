const regex = Object.freeze({
    // Min 8 chars, at least 1 letter and 1 num (special chars allowed)
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+.]{8,}$/,
    username: /^[a-zA-Z0-9]{2,12}$/, // Alpha numeric username 2-12 chars
});

module.exports = regex;
