const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceComments(placeId, user, page) {
    const { ownerId, role } = user || {};

    const perPage = 5;
    const skip = (page - 1) * perPage;

    const promises = [
        Comment.countDocuments({ placeId }),
        Place.findById(placeId)
            .select('comments')
            .populate({
                path: 'comments',
                populate: { path: 'ownerId', select: 'username avatarUrl' },
                options: {
                    skip: skip,
                    limit: perPage,
                    sort: { time: -1 }, // Sort by time in descending order (most recent first)
                },
            })
            .lean()
            .exec(),
    ];

    const [count, place] = await Promise.all(promises);

    if (!place) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    // determine if there is next page to be requested in order to notify the client
    const hasNextPage = skip + perPage < count;
    const hasPreviousPage = page > 1;
    const totalPages = Math.ceil(count / perPage);

    // Adds isOwner boolean if the current user (if any) is the owner of the comment
    place.comments.forEach((comment) => {
        // This fallback shouldn't be needed, but just in case if a deleted user wasn't removed from place commenters
        const deletedOwner = deletedUserFallback();

        // Removes owner id before sending it to the client
        const { _id, ...ownerData } = comment.ownerId || deletedOwner;

        // Add isOwner field to an admin too
        if (user && (_id.equals(ownerId) || role === 'admin')) {
            comment.isOwner = true;
        }

        comment.ownerId = {
            ...ownerData,
            username: capitalizeEachWord(ownerData.username),
        };
    });

    return {
        data: place.comments,
        totalComments: count,
        hasNextPage,
        hasPreviousPage,
        totalPages,
    };
}

function deletedUserFallback() {
    return {
        _id: new mongoose.Types.ObjectId(),
        username: 'deleted',
        avatarUrl: 'https://res.cloudinary.com/degidchop/image/upload/v1690401797/avatars/reedeharqpql6jvjdwcs.png',
    };
}

module.exports = getPlaceComments;
