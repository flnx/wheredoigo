const User = require('../../models/userSchema');
const FailedDeletion = require('../../models/failedImgDeletionSchema');

const { errorMessages } = require('../../constants/errorMessages');

// Cloudinary
const { avatarOptions } = require('../../config/cloudinary');
const { handleImageUploads, deleteImage } = require('../../utils/cloudinaryUploader');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { generateUserToken } = require('../../utils/generateUserToken');
const { validateImages } = require('../../utils/validateImages');

require('dotenv').config();

const updateUserAvatar = async (image, userData) => {
    // Validates if its a valid image file
    validateImages([image], 1);

    const user = await User.findById(userData.ownerId).exec();

    if (!user) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const imageData = await handleImageUploads([image], avatarOptions);

    if (user.avatar_id) {
        deleteImage(user.avatar_id).catch((err) => {
            // If the image fails to delete from cloudinary, store it in DB (to delete it later)
            FailedDeletion.create({ public_ids: [user.avatar_id || null] }).catch(
                (err) => console.error(err?.message)
            );
        });
    }

    const { url, public_id } = imageData.value[0];

    user.avatarUrl = url;
    user.avatar_id = public_id;
    await user.save();

    const accessToken = await generateUserToken(user);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        avatarUrl: url,
        role: user.role,
        accessToken,
    };
};

module.exports = updateUserAvatar;
