const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');

async function deleteCommentFromPlace(placeId, commentId, user) {
    const { ownerId, role } = user;

    if (!commentId || !isValid(commentId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const comment = await Comment.findById(commentId).exec();

        if (!comment) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        // Allow admin role to bypass access check
        if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const place = await Place.deletePlaceCommentAndRating({
            placeId,
            commentId,
            data: {
                numRate: comment.rating > 0 ? 1 : 0,
                comment,
                ownerId,
            },
            session,
        });

        const promises = [
            Comment.findByIdAndDelete(commentId, { session }).exec(),
            UserActivity.removeCommentActivity(ownerId, placeId, session),
        ];

        await Promise.all(promises);
        await session.commitTransaction();

        return {
            averageRating: place.averageRating,
            message: 'Comment deleted 🦖',
        };
        
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deleteCommentFromPlace;
