const cloudinary = require('cloudinary').v2;
const config = require('./config');

function cloudinaryConfig() {
    cloudinary.config({
        cloud_name: config.CLOUD_NAME,
        api_key: config.CLOUDINARY_KEY,
        api_secret: config.CLOUDINARY_SECRET,
    });
}

module.exports = {
    cloudinary,
    cloudinaryConfig,
};
