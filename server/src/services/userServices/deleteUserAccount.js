const Place = require('../../models/placeSchema');
const User = require('../../models/userSchema');
const Destination = require('../../models/destinationSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

const deleteUserAvatar = require('../cloudinaryService/deleteUserAvatar');
const deleteCommentFromPlace = require('../placeServices/deleteCommentFromPlace');

const { errorMessages } = require('../../constants/errorMessages');
const { createValidationError } = require('../../utils/createValidationError');

async function deleteUserAccount(userData) {
    const { ownerId } = userData;

    const promises = [
        User.findById(ownerId).lean().exec(),
        Comment.find({ ownerId: ownerId }).select('placeId').lean().exec(),
        User.findOne({ username: 'skywalker' }).select('_id').lean().exec(),
    ];

    const [user, comments, skywalker] = await Promise.all(promises);

    if (!user) {
        throw createValidationError(errorMessages.auth.unauthorized, 401);
    }

    // Skywalker can't bypass account deletion
    if (user.username == 'skywalker'.toLowerCase()) {
        throw createValidationError('You shall not pass');
    }

    // Transfer user destinations and places ownership to Skywalker (if he's still alive)
    if (skywalker) {
        await transferOwnershipToAdmin(ownerId, skywalker._id);
    }

    // Delete user comments
    await deleteUserComments(comments, userData);

    // Delete user and user activities
    const unsettledPromises = await Promise.allSettled([
        deleteUserAvatar(user.avatar_id),
        deleteActivities(ownerId),
        User.findByIdAndDelete(ownerId),
    ]);

    // Log the errors
    for (const result of unsettledPromises) {
        if (result.status == 'rejected') {
            console.error(result.reason);
        }
    }

    return {
        message: 'User deleted 🦖',
    };
}

async function transferOwnershipToAdmin(userId, skywalkerId) {
    const matchQuery = { ownerId: userId };
    const updateQuery = { $set: { ownerId: skywalkerId } };

    try {
        const destPromise = Destination.updateMany(matchQuery, updateQuery);
        const placesPromise = Place.updateMany(matchQuery, updateQuery);

        await Promise.all([destPromise, placesPromise]);
    } catch (err) {
        console.error(err.message || err);
        throw createValidationError(errorMessages.request.server);
    }
}

async function deleteActivities(ownerId) {
    const activityPromises = [
        Destination.updateMany(
            { likes: ownerId },
            { $pull: { likes: ownerId }, $inc: { likesCount: -1 } }
        )
            .lean()
            .exec(),
        UserActivity.deleteOne({ userId: ownerId }).lean().exec(),
    ];

    const promises = await Promise.allSettled(activityPromises);

    for (const result of promises) {
        if (result.status == 'rejected') {
            console.error(result.reason);
        }
    }
}

// Transactional moongose operation
async function deleteUserComments(comments, userData) {
    const commentPromises = comments.map((comment) =>
        deleteCommentFromPlace(
            comment.placeId.toString(),
            comment._id.toString(),
            userData
        )
    );

    const promises = await Promise.allSettled(commentPromises);

    for (const result of promises) {
        if (result.status == 'rejected') {
            console.error(result.reason);
        }
    }
}

module.exports = deleteUserAccount;
