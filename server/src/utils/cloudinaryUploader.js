const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

const options = {
    folder: 'uploads',
    transformation: [
        { width: '2000', height: '1312', crop: 'limit' },
        { quality: 'auto:best', fetch_format: 'auto' },
        { dpr: 'auto' },
    ],
    strip_metadata: true,
};

async function handleImageUploads(files) {
    const promises = [];

    for (const file of files) {
        const promise = uploadImageToCloudinary(file.buffer);
        promises.push(promise);
    }

    try {
        const imagesData = await Promise.all(promises);
        return imagesData;
    } catch (err) {
        throw new Error(
            'Failed to upload images to Cloudinary: ' + err.message
        );
    }
}
function uploadImageToCloudinary(imageBuffer) {
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

module.exports = {
    handleImageUploads,
};
