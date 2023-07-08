const User = require('../../models/userSchema');

const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { generateUserToken } = require('../../utils/generateUserToken');

// Service
const uploadUserAvatar = require('../cloudinaryService/uploadUserAvatar');
const deleteUserAvatar = require('../cloudinaryService/deleteUserAvatar');

require('dotenv').config();

const updateUserAvatar = async (image, userData) => {
    const user = await User.findById(userData.ownerId)
        .select('-hashedPassword')
        .exec();

    if (!user) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    const avatarIdToDelete = user.avatar_id;

    // Uploads the new avatar
    const imageData = await uploadUserAvatar([image]);    

    // Deletes the old avatar
    deleteUserAvatar(avatarIdToDelete);

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