const { isObject, isValidInteger } = require('./utils');
const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');

function validateImages(images, minimumNum) {
    if (!Array.isArray(images)) {
        throw createValidationError(errorMessages.invalidImages, 400);
    }

    const filteredArray = images.filter((obj) => {
        const isValidObject = isObject(obj);
        const hasBufferAndMimetype =
            isValidObject &&
            Object.hasOwn(obj, 'buffer') &&
            Object.hasOwn(obj, 'mimetype');

        const isBuffer = isValidObject && Buffer.isBuffer(obj.buffer);
        return isValidObject && hasBufferAndMimetype && isBuffer;
    });

    const minNum = isValidInteger(minimumNum) ? minimumNum : 1;

    if (filteredArray.length < minNum) {
        throw createValidationError(errorMessages.imagesBoundary, 400);
    }

    return true;
}

module.exports = {
    validateImages,
};
