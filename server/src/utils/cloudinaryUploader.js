const FailedDeletion = require('../models/failedImgDeletionSchema');

const { cloudinary } = require('../config/cloudinary');
const { createValidationError } = require('./createValidationError');
const { errorMessages } = require('../constants/errorMessages');

// Services
const deleteImageFromCloudinary = require('../services/cloudinaryService/delete/delete');


async function deleteMultipleImages(public_ids, folderNames) {
    // Validate the props
    if (!Array.isArray(public_ids) || !Array.isArray(folderNames)) {
        throw createValidationError(errorMessages.cloudinaryValidation, 400);
    }

    try {
        const promises_ids = public_ids.map((id) => deleteImage(id));
        const results = await Promise.allSettled(promises_ids);

        // Filters out the rejected promises
        let failedPromises = results.filter(
            (result) => result.status === 'rejected'
        );

        const failedToDeleteAfterRetry = await retryDeletion(failedPromises);

        // If there is still undeleted images - it stores the public ids (to delete them later)
        if (failedToDeleteAfterRetry.length > 0) {
            const failedPublicIds = failedToDeleteAfterRetry.map(
                (result) => result.reason.publicId
            );

            // Stores the ids in the specified mongoDB schema
            FailedDeletion.create({ public_ids: failedPublicIds }).catch((err) =>
                console.error(err.message)
            );

            // Calculate how many images have been deleted
            const deletedImgs =
                promises_ids.length - failedToDeleteAfterRetry.length;
            const initialImages = promises_ids.length;

            // Log the result
            const errorMessage = `Deleted: ${deletedImgs} out of ${initialImages}`;

            throw new Error(errorMessage);
        }

        // Delete the folder/folders upon success
        folderNames.forEach((folder) => cloudinary.api.delete_folder(folder));

        return true;
    } catch (error) {
        throw error;
    }

    async function retryDeletion(promises) {
        let retryAttempts = 0;
        const MAX_RETRY_ATTEMPTS = 2;

        // Copy array
        let failedPromises = promises.slice();

        // Retry the deletion of failed images when there's rejected promises
        while (retryAttempts < MAX_RETRY_ATTEMPTS && failedPromises.length > 0) {
            const retryPromises = failedPromises.map((result) =>
                deleteImage(result.reason.publicId, retryAttempts)
            );

            const retryResults = await Promise.allSettled(retryPromises);

            // Filter out still failed promises for the next iteration
            failedPromises = retryResults.filter(
                (result) => result.status === 'rejected'
            );

            retryAttempts++;

            // 1s delay before the next retry
            await delay(1000);
        }

        return failedPromises;
    }

    // Utility function to introduce a delay
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

async function deleteImage(publicId) {
    const result = await deleteImageFromCloudinary(publicId);
    return result;
}

module.exports = {
    addImages: uploadImages,
    handleImageUploads,
    deleteImage,
    deleteMultipleImages,
};
