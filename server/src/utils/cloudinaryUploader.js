const streamifier = require('streamifier');
const { cloudinary } = require('../config/cloudinary');
const { fixInvalidFolderNameChars } = require('./utils');
const { imagesOptions } = require('../config/cloudinary');
const { createValidationError } = require('./createValidationError');
const { errorMessages } = require('../constants/errorMessages');

async function addImages(images, obj, folderName) {
    const imageUrls = [];
    let imgError = null;

    try {
        // Set the folder type and name for Cloudinary
        const folder_type = folderName;
        const folder_name = fixInvalidFolderNameChars(obj.city, obj._id);

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
    if (!Array.isArray(public_ids) || !Array.isArray(folderNames)) {
        throw createValidationError(errorMessages.cloudinaryValidation, 400);
    }

    try {
        const promises_ids = public_ids.map((x) => deleteImage(x));
        await Promise.all(promises_ids);

        folderNames.forEach((folder) => cloudinary.api.delete_folder(folder));

        return true;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

async function deleteImage(publicId) {
    const res = await cloudinary.uploader.destroy(publicId);

    if (res.result !== 'ok') {
        throw createValidationError(errorMessages.notFound, 404);
    }
}

module.exports = {
    addImages,
    handleImageUploads,
    deleteImage,
    deleteMultipleImages,
};
