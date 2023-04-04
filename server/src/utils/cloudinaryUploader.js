const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

const options = {
    folder: 'uploads',
    transformation: [
        { width: 1200, height: 800, crop: 'fit' },
        { quality: 'auto:good', fetch_format: 'auto' },
    ],
};

async function handleImageUploads(files) {
    const imagesData = [];

    try {
        for (const file of files) {
            const imgData = await uploadImageToCloudinary(file.buffer);
            imagesData.push(imgData);
        }

        return imagesData;
    } catch (err) {
        throw err;
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
