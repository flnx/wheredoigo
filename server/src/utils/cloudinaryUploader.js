const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

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
        console.log(error.message);
        return {};
    }
}

async function deleteImage(publicId) {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        console.log(error);
        return {};
    }
}

module.exports = {
    handleImageUploads,
    deleteImage,
};
