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
        const folder_type = folderName;
        const folder_name = fixInvalidFolderNameChars(obj.city, obj._id);

        const cloudinaryImagesData = await handleImageUploads(
            images,
            imagesOptions(folder_type, folder_name)
        );

        for (const imageData of cloudinaryImagesData) {
            if (imageData.url) {
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

    return {
        imageUrls,
        imgError,
    };
}

async function handleImageUploads(files, options = {}) {
    const promises = [];

    for (const file of files) {
        const promise = uploadImageToCloudinary(file.buffer, options);
        promises.push(promise);
    }

    try {
        const imagesData = await Promise.all(promises);
        return imagesData;
    } catch (err) {
        throw new Error('Failed to upload images to Cloudinary: ' + err.message);
    }
}

function uploadImageToCloudinary(imageBuffer, options = {}) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            options,
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

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
