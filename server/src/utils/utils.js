function validatePassword(password) {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=[\w\d#?!@$%^&*-_]).{8,}$/;

    return regex.test(password);
}

function fixInvalidFolderNameChars(city, id) {
    return `${city}-${id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function extractCloudinaryFolderName(path, name, id) {
    const validateFolderName = fixInvalidFolderNameChars(name, id);
    const folderName = `${path}/${validateFolderName}`;

    return folderName;
}

module.exports = {
    validatePassword,
    fixInvalidFolderNameChars,
    isObject,
    extractCloudinaryFolderName
};
