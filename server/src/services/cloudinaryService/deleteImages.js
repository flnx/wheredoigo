const FailedDeletion = require('../../models/failedImgDeletionSchema');

// Service
const deleteImageFromCloudinary = require('./delete/deleteImageFromCloudinary');
const deleteFolders = require('./delete/deleteFolders');

// Utils
const delay = require('../../utils/delay');
const validateDeleteImages = require('../../utils/validators/validateDeleteImages');

async function deleteImages(public_ids = [], folderNames = []) {
    // Validate the props
    validateDeleteImages(public_ids, folderNames)
  
    try {
        // Create an array of promises for file deletions
        const promises_ids = public_ids.map((id) => deleteImageFromCloudinary(id));

        // Wait for all the file delete promises to settle
        const results = await Promise.allSettled(promises_ids);

        // Filters out the rejected promises
        let failedPromises = results.filter(
            (result) => result.status === 'rejected'
        );

        // Retry the rejected ones (the ones that were not deleted)
        const failedToDelete = await retryDeletion(failedPromises);

        // If there are still undeleted images - store the public ids in DB (to delete them later)

        if (failedToDelete.length > 0) {
            const errorMessage = await storeTheUndeletedToDB(failedToDelete, promises_ids);
            console.error(errorMessage);
        }

        return true;
    } catch (error) {
        throw error;
    } finally {
        // deletes the empty folders
        deleteFolders(folderNames);
    }
}


async function storeTheUndeletedToDB(failedToDelete, promises_ids) {
    const failedPublicIds = failedToDelete.map((result) => result.reason.publicId);

    // Store the ids in the specified mongoDB schema
    FailedDeletion.create({ public_ids: failedPublicIds }).catch((err) =>
        console.error(err?.message)
    );

    // Calculate how many images have been deleted
    const deletedImgs = promises_ids.length - failedToDelete.length;
    const requestedImages = promises_ids.length;

    // Log the result
    const errorMessage = `Deleted: ${deletedImgs} out of ${requestedImages}`;

    return errorMessage;
}


async function retryDeletion(promises) {
    let retryAttempts = 0;
    const MAX_RETRY_ATTEMPTS = 2;

    // Copy array
    let failedPromises = promises.slice();

    // Retry the deletion of failed images when there are rejected promises
    while (retryAttempts < MAX_RETRY_ATTEMPTS && failedPromises.length > 0) {
        const retryPromises = failedPromises.map((result) =>
            deleteImageFromCloudinary(result.reason.publicId)
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

module.exports = {
    deleteImages,
};
