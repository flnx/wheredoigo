const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceComments(placeId, user, currentPage) {
    const page = currentPage || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const promises = [
        Place.findById(placeId).select('comments').count().lean().exec(),
        Place.findById(placeId)
            .select('comments')
            .populate({
                path: 'comments',
                populate: { path: 'ownerId', select: 'username avatarUrl' },
                options: { skip: skip, limit: perPage },
            })
            .lean()
            .exec(),
    ];

    const [count, placeComments] = await Promise.all(promises);

    if (!placeComments) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // determine if there is next page to be requested in order to notify the client
    const hasNextPage = skip + perPage < count;
    const hasPreviousPage = page > 1;
    const totalPages = Math.ceil(count / perPage);

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

    return {
        data: placeComments.comments,
        totalComments: count,
        hasNextPage,
        hasPreviousPage,
        totalPages
    }
}

module.exports = getPlaceComments;
