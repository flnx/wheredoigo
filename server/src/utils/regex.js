const regex = Object.freeze({
    // Minimum eight characters, at least one letter and one number:
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    // Alpha numeric username
    username: /^[a-zA-Z0-9]+$/,
});

module.exports = regex;
