const FailedDeletion = require('../models/failedImgDeletionSchema');

const streamifier = require('streamifier');
const { cloudinary } = require('../config/cloudinary');
const { fixInvalidFolderNameChars } = require('./utils');
const { imagesOptions } = require('../config/cloudinary');
const { createValidationError } = require('./createValidationError');
const { errorMessages } = require('../constants/errorMessages');
const { validateImages } = require('./validateImages');

async function addImages(images, data, folderName, minImagesRequired = 1) {
    // Validating the image files with default minimum number of images required
    validateImages(images, minImagesRequired);

    const imageUrls = [];
    let imgError = null;

    try {
        // Set the folder type and name for Cloudinary
        const folder_type = folderName;
        const folder_name = fixInvalidFolderNameChars(data.city, data._id);

        // Upload the images to Cloudinary
        const cloudinaryImagesData = await handleImageUploads(
            images,
            imagesOptions(folder_type, folder_name)
        );

        // Process the Cloudinary image data
        for (const imageData of cloudinaryImagesData) {
            if (imageData.url) {
                // Add the image URL and public ID to the list
                imageUrls.push({
                    imageUrl: imageData.url,
                    public_id: imageData.public_id,
                });
            } else {
                console.log('An image failed to upload:', imageData);
            }
        }
    } catch (err) {
        console.log(err.message);
        imgError = err.message || err;
    }

    // Throw an error if no image URLs were generated
    if (imageUrls.length == 0) {
        throw createValidationError(
            `${errorMessages.serverError}... ${imgError}`,
            500
        );
    }

    // Return the image URLs and any error that occurred
    return {
        imageUrls,
        imgError,
    };
}

async function handleImageUploads(files, options = {}) {
    const promises = [];

    // Upload each file to Cloudinary
    for (const file of files) {
        const promise = uploadImageToCloudinary(file.buffer, options);
        promises.push(promise);
    }

    // Wait for the promises to get resolved
    const settledPromises = await Promise.allSettled(promises);

    // Filter out the successful uploads
    const fulfilledResults = settledPromises
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value);

    // Filter out the unsuccessful ones
    const rejectedErrors = settledPromises
        .filter((result) => result.status === 'rejected')
        .map((result) => result.reason);

    // Throw error if there's not a single successful upload
    if (fulfilledResults.length === 0) {
        throw new Error('Failed to upload images to Cloudinary');
    }

    // Log the errors from rejected promises
    rejectedErrors.forEach((error) => {
        console.error('Error uploading image:', error);
    });

    // ! Add an error message to notify the client if there is some failed uploads
    return fulfilledResults;
}

function uploadImageToCloudinary(imageBuffer, options = {}) {
    return new Promise((resolve, reject) => {
        // Create an upload stream to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (result) {
                    // Resolve with the result if successful
                    resolve(result);
                } else {
                    // Reject with the error if upload fails
                    reject(error);
                }
            }
        );

        // Pipe the image buffer to the upload stream
        streamifier.createReadStream(imageBuffer).pipe(uploadStream);
    });
}

async function deleteMultipleImages(public_ids, folderNames) {
    // Validate the props
    if (!Array.isArray(public_ids) || !Array.isArray(folderNames)) {
        throw createValidationError(errorMessages.cloudinaryValidation, 400);
    }

    try {
        const promises_ids = public_ids.map((id) => deleteImage(id));
        const results = await Promise.allSettled(promises_ids);

        // Filters out the rejected promises
        let failedPromises = results.filter((result) => result.status === 'rejected');

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
            const deletedImgs = promises_ids.length - failedToDeleteAfterRetry.length;
            const initialImages = promises_ids.length;

            // Log the result
            const errorMessage = `Deleted: ${deletedImgs} out of ${initialImages}`
            
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
            failedPromises = retryResults.filter((result) => result.status === 'rejected');

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
    try {
        const res = await cloudinary.uploader.destroy(publicId);

        if (res.result !== 'ok') {
            console.error(res);
            throw new Error();
        }

        return true;
    } catch (err) {
        console.log(err.message);
        err.publicId = publicId;
        throw err;
    }
}

module.exports = {
    addImages,
    handleImageUploads,
    deleteImage,
    deleteMultipleImages,
};
