const fixInvalidFolderNameChars = require("./fixInvalidFolderNameChars");

function extractCloudinaryFolderName(path, name, id) {
    const validateFolderName = fixInvalidFolderNameChars(name, id);
    const folderName = `${path}/${validateFolderName}`;

    return folderName;
}

module.exports = extractCloudinaryFolderName;