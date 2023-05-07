const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceComments(placeId, user) {
    const placeComments = await Place.findById(placeId)
        .select('comments')
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username avatarUrl' },
            options: { limit: 10 },
        })
        .lean()
        .exec();

    if (!placeComments) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // Adds isOwner boolean if the current user (if any) is the owner of the comment
    placeComments.comments.forEach((comment) => {
        // Removes owner id before sending it to the client
        const { _id, ...ownerData } = comment.ownerId;

        if (user && _id.equals(user.ownerId)) {
            comment.isOwner = true;
        }

        comment.ownerId = {
            ...ownerData,
            username: capitalizeEachWord(ownerData.username),
        };
    });

    return placeComments.comments;
}

module.exports = getPlaceComments;
