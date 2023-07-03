const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { isString, isValidInteger } = require('../../utils/utils');
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');

async function addCommentToPlace({ id, title, content, rating, user }) {
    validateFields({ content, title, rating });
    const { ownerId, avatarUrl, username } = user;

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        placeId: id,
        ownerId,
        rating,
    });

    const numRate = rating > 0 ? 1 : 0;

    const place = await updatePlace(id, ownerId, comment, numRate, rating);

    const promises = [
        comment.save(), 
        addUserActivity(ownerId, id, comment._id)
    ];

    await Promise.all(promises);

    // Calc average place rating
    const averageRating = calcAverageRating(place.rating, rating);

    return {
        title: comment.title,
        content: comment.content,
        rating: comment.rating,
        _id: comment._id,
        time: comment.time,
        ownerId: {
            avatarUrl,
            username,
        },
        isOwner: true,
        averageRating,
    };
}

async function updatePlace(id, ownerId, comment, numRate, rating) {
    const udpatedPlace = await Place.findOneAndUpdate(
        { _id: id, commentedBy: { $ne: ownerId } },
        {
            $push: {
                comments: comment._id,
                commentedBy: ownerId,
            },
            $inc: {
                'rating.numRates': numRate,
                'rating.sumOfRates': rating,
            },
        },
        { new: true }
    )
        .select('rating')
        .lean()
        .exec();

    if (!udpatedPlace) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    return udpatedPlace;
}

async function addUserActivity(userId, placeId, commentId) {
    return UserActivity.updateCommentsActivity(userId, placeId, commentId);
}

function validateFields({ content, title, rating }) {
    if (!isString(content) || content.length < 10) {
        throw createValidationError(errorMessages.invalidComment, 400);
    }

    if (!isString(title) || title.length < 2) {
        throw createValidationError(errorMessages.commentTitle, 400);
    }

    if (!isValidInteger(rating) || rating < 0 || rating > 5) {
        throw createValidationError(400, errorMessages.invalidRating);
    }
}

module.exports = addCommentToPlace;
