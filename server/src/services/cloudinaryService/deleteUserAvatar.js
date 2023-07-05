const FailedDeletion = require('../../models/failedImgDeletionSchema');
const deleteImageFromCloudinary = require('./delete/deleteImageFromCloudinary');

async function deleteUserAvatar(publicId) {
    // If there is no avatarId just return (Purpose: new users don't have avatarId)
    if (!publicId) return;

    try {
        const res = await deleteImageFromCloudinary(publicId);
        return res;
    } catch (err) {
        console.error(err?.message);
        // If the image fails to delete from cloudinary, store it in DB (to delete it later)
        FailedDeletion.create({ public_ids: [publicId] }).catch((err) =>
            console.error(err.message || err)
        );
    }

    return true;
}

module.exports = deleteUserAvatar;