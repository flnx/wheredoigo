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

    // Checks if the commentId is a valid mongoDB id
    if (!commentId || !isValid(commentId)) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    // Finds the comment
    const comment = await Comment.findById(commentId).exec();

    // Checks if it exists
    if (!comment) {
        throw new Error(`${errorMessages.data.notFound}`);
    }

    // Allow admin role to bypass ownership check
    if (role !== 'admin' && !comment.ownerId.equals(ownerId)) {
        throw createValidationError(errorMessages.auth.accessDenied, 403);
    }

    // Starting a transaction
    const session = await mongoose.startSession();

    try {
        let result;
        await session.withTransaction(async () => {
            // Deletes the comment from Place Model, recalcs rating and returns the updated version
            const place = await Place.deletePlaceCommentAndRating({
                placeId,
                commentId,
                data: {
                    rating: comment.rating,
                    ownerId: comment.ownerId,
                },
                session,
            });

            // Deletes the commment from Comment Model
            const cResult = await Comment.findByIdAndDelete(commentId, { session });

            // If any error occurs, it throws
            if (!cResult) {
                throw new Error(
                    errorMessages.transaction('Comment is missing in model')
                );
            }

            // Updates the user activity
            await UserActivity.removeCommentActivity(
                comment.ownerId,
                placeId,
                session
            );

            result = {
                averageRating: place.averageRating,
                message: 'Comment deleted 🦖',
            };
        });

        return result;
    } catch (err) {
        console.error(err.message || err);
        throw createValidationError(errorMessages.data.notFound, 404);
    } finally {
        // Ending the transaction
        await session.endSession();
    }
}

module.exports = deleteCommentFromPlace;
