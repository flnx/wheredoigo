function validatePassword(password) {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=[\w\d#?!@$%^&*-_]).{8,}$/;

    return regex.test(password);
}

function fixInvalidFolderNameChars(city, id) {
    return `${city}-${id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

module.exports = {
    validatePassword,
    fixInvalidFolderNameChars
};
