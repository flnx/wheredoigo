const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const config = require('./config');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).array('imageUrls', 20);

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
    upload,
};
