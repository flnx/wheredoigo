const streamifier = require('streamifier');
const { cloudinary } = require('../config/cloudinary');
const { fixInvalidFolderNameChars } = require('./utils');
const { imagesOptions } = require('../config/cloudinary');

async function addImages(images, obj, folderName) {
    const imageUrls = [];
    let imgError = null;

    try {
        const folder_type = folderName;
        const folder_name = fixInvalidFolderNameChars(obj.name, obj._id);

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
        imgError = err;
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
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(imageBuffer).pipe(uploadStream);
    });
}

async function deleteDestinationImages(folderName) {
    try {
        await cloudinary.api.delete_folder(folderName);
    } catch (error) {
        return {};
    }
}

async function deleteImage(publicId) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        return {};
    }
}

module.exports = {
    addImages,
    handleImageUploads,
    deleteImage,
};
