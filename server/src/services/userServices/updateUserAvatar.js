const jwt = require('../../lib/jsonwebtoken');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');

const { avatarOptions } = require('../../config/cloudinary');
const { handleImageUploads, deleteImage } = require('../../utils/cloudinaryUploader');
const { createValidationError } = require('../../utils/createValidationError');

require('dotenv').config();

const updateUserAvatar = async (image, jwtToken) => {
    const user = await User.findById(jwtToken.ownerId).exec();

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

    const payload = {
        ownerId: user._id,
        email: user.email,
        username: user.capitalizedUsername,
    };

    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET);

    return {
        email: user.email,
        username: user.capitalizedUsername,
        accessToken,
        avatarUrl: url,
    };
};

module.exports = updateUserAvatar;