function validatePassword(password) {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=[\w\d#?!@$%^&*-_]).{8,}$/;

    return regex.test(password);
}

module.exports = {
    validatePassword,
};

// username: /^[a-zA-Z0-9_-]{2,25}$/,
