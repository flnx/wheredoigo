const cloudinary = require('cloudinary').v2;
const config = require('./config');

function cloudinaryConfig() {
    cloudinary.config({
        cloud_name: config.CLOUD_NAME,
        api_key: config.CLOUDINARY_KEY,
        api_secret: config.CLOUDINARY_SECRET,
    });
}

const imagesOptions = (mainFolder, subFolder) => {
    return {
        folder: `${mainFolder}/${subFolder}`,
        transformation: [
            { width: '2000', height: '1312', crop: 'limit' },
            { quality: 'auto:best', fetch_format: 'auto' },
            { dpr: 'auto' },
        ],
        strip_metadata: true,
    };
};

const avatarOptions = {
    folder: 'avatars',
    transformation: [
        { width: '500', height: '500', crop: 'fill' },
        { quality: 'auto:best', fetch_format: 'auto' },
        { dpr: 'auto' },
    ],
    strip_metadata: true,
};

module.exports = {
    cloudinary,
    cloudinaryConfig,
    imagesOptions,
    avatarOptions,
};
