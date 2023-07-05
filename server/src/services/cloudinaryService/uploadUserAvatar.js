const uploadImagesToCloudinary = require('./upload/uploadImagesToCloudinary');
const { avatarOptions } = require('../../config/cloudinary');

async function uploadUserAvatar(image) {
    try {
        // Upload the image to Cloudinary
        const imageData = await uploadImagesToCloudinary(
            [image],
            avatarOptions,
            minImagesRequired
        );

        return imageData;
    } catch (err) {
        console.error(err?.message);
        throw err;
    }
}

module.exports = uploadUserAvatar;
