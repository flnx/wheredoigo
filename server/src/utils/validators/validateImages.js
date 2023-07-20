const { isObject, isValidInteger } = require('../utils');
const { errorMessages } = require('../../constants/errorMessages');
const { createValidationError } = require('../createValidationError');

function validateImages(images, minimumNum) {
    // Check if 'images' is an array
    if (!Array.isArray(images)) {
        throw createValidationError(errorMessages.form.array('images'), 400);
    }

    // Filter the array to ensure each object has the required properties
    const filteredArray = images.filter((file) => {
        // Check if 'obj' is a valid object
        const isValidObject = isObject(file);

        // Check if 'obj' has the 'buffer' and 'mimetype' properties
        const hasBufferAndMimetype =
            isValidObject &&
            Object.hasOwn(file, 'buffer') &&
            Object.hasOwn(file, 'mimetype');

        // Check if 'obj.buffer' is a Buffer
        const isBuffer = isValidObject && Buffer.isBuffer(file.buffer);
        
        // Check if 'obj.mimetype' corresponds to an expected image format
        const isImageFormat = isValidObject && isExpectedImageFormat(file.mimetype);

        return isValidObject && hasBufferAndMimetype && isBuffer && isImageFormat;
    });

    // Determine the minimum number of images required
    const minNum = isValidInteger(minimumNum) ? minimumNum : 1;

    // Check if the filtered array has the minimum number of images
    if (filteredArray.length < minNum) {
        throw createValidationError(errorMessages.data.imagesBoundary(minNum), 400);
    }

    return true;
}

function isExpectedImageFormat(mimetype) {
    // List of expected image formats
    const expectedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];

    // Check if the provided mimetype is in the list of expected formats
    return expectedFormats.includes(mimetype);
}

module.exports = {
    validateImages,
};
