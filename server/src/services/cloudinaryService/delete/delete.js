const { cloudinary } = require('../../../config/cloudinary');

async function deleteImageFromCloudinary(publicId) {
    try {
        const res = await cloudinary.uploader.destroy(publicId);

        if (res.result !== 'ok') {
            console.error(res);
            throw new Error();
        }

        return true;
    } catch (err) {
        console.error(err.message);
        err.publicId = publicId;
        throw err;
    }
}

module.exports = deleteImageFromCloudinary;