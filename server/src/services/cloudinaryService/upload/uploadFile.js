const streamifier = require('streamifier');
const { cloudinary } = require('../../../config/cloudinary');

function uploadFile(imageBuffer, options = {}) {
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

// const result = await cloudinary.uploader.upload(fileBuffer, options);

module.exports = uploadFile;
