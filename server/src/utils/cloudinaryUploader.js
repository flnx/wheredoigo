const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

const options = {
    folder: 'uploads',
    transformation: [
        { width: '2000', height: '1312', crop: "limit" },
        { quality: 'auto:best', fetch_format: 'auto' },
        { dpr: 'auto' },
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
