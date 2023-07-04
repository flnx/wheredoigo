const User = require('../../models/userSchema');
const FailedDeletion = require('../../models/failedImgDeletionSchema');

const { errorMessages } = require('../../constants/errorMessages');

// Cloudinary
const { avatarOptions } = require('../../config/cloudinary');
const { handleImageUploads, deleteImage } = require('../../utils/cloudinaryUploader');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { generateUserToken } = require('../../utils/generateUserToken');

require('dotenv').config();

const updateUserAvatar = async (image, userData) => {
    const user = await User.findById(userData.ownerId)
        .select('-hashedPassword')
        .exec();

    if (!user) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const imageData = await handleImageUploads([image], avatarOptions, 1);

    // Deletes the old avatar from cloudinary (if any)
    if (user.avatar_id) {
        deleteImage(user.avatar_id).catch((err) => {
            // If the image fails to delete from cloudinary, store it in DB (to delete it later)
            FailedDeletion.create({ public_ids: [user.avatar_id] }).catch(
                (err) => console.error(err?.message)
            );
        });
    }

    // Extracts the newly updated image url and public id
    const { url, public_id } = imageData[0];

    // Saves the new url and public_id
    user.avatarUrl = url;
    user.avatar_id = public_id;
    await user.save();

    // Regenerates the token
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
