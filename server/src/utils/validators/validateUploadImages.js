const { isObject, isString } = require('../utils');

function validateUploadImagesFields(data, mainFolder) {
    const city = data?.city;
    const _id = data?._id;

    if (!isObject(data)) {
        throw new Error('uploadImages(): data must be an object');
    }

    // Validate if both city and _id are strings
    if (!isString(city) || city.length == 0) {
        throw new Error('uploadImages(): City must be a non empty string');
    }

    if (!isString(_id) || _id.length == 0) {
        throw new Error('uploadImages(): _id must be a non empty string');
    }

    if (!isString(mainFolder) || mainFolder.length == 0) {
        throw new Error('uploadImages(): mainFolder must be a non empty string');
    }
}

module.exports = validateUploadImagesFields;