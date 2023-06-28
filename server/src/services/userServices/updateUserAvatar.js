const jwt = require('../../lib/jsonwebtoken');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');

const { avatarOptions } = require('../../config/cloudinary');
const { handleImageUploads, deleteImage } = require('../../utils/cloudinaryUploader');
const { createValidationError } = require('../../utils/createValidationError');
const { generateUserToken } = require('../../utils/generateUserToken');

require('dotenv').config();

const updateUserAvatar = async (image, userData) => {
    const user = await User.findById(userData.ownerId).exec();

    if (!user) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!image) {
        throw createValidationError(errorMessages.invalidImages);
    }
    
    const promises = [
        handleImageUploads([image], avatarOptions),
        deleteImage(user.avatar_id),
    ];

    const [imageData, _] = await Promise.allSettled(promises);

    if (imageData.status !== 'fulfilled') {
        throw createValidationError(errorMessages.uploadError, 500)
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