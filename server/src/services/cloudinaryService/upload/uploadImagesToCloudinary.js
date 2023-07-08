const uploadFile = require('./uploadFile');

// Utils
const { validateImages } = require('../../../utils/validators/validateImages');
const { createValidationError } = require('../../../utils/createValidationError');
const { errorMessages } = require('../../../constants/errorMessages');

async function uploadImagesToCloudinary(
    files = [],
    options = {},
    minImagesRequired = 1
) {
    // Validating the image files and checking if they are at least "minImagesRequired num"
    validateImages(files, minImagesRequired);

    // Create an array of promises for file uploads
    const promises = files.map((file) => uploadFile(file.buffer, options));

    // Wait for all the file upload promises to settle
    const settledPromises = await Promise.allSettled(promises);

    // Filter out the successful file uploads
    const fulfilledResults = settledPromises
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

    // Filter out the failed file uploads
    const rejectedErrors = settledPromises
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason);

    // Throw error if there's not a single successful upload
    if (fulfilledResults.length === 0) {
        throw createValidationError(errorMessages.request.upload)
    }

    // Log the errors from rejected promises
    rejectedErrors.forEach((error) => {
        console.error('Error uploading images:');
        console.error(error.message || error);
    });

    return fulfilledResults;
}

module.exports = uploadImagesToCloudinary;
