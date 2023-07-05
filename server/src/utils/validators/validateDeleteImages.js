const { isValidArrayOfStrings } = require('../utils');

function validateDeleteImages(publicIds, folderNames) {
    if (!isValidArrayOfStrings(publicIds) || !Array.isArray(folderNames)) {
        throw new Error('deleteImages(): public_ids and folder names must be arrays');
    }

    if (folderNames.length != 0 && !isValidArrayOfStrings(folderNames)) {
        throw new Error('deleteImages(): folderNames must be an array of string values');
    }

    return true;
}

module.exports = validateDeleteImages;