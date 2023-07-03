const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');

async function deleteCommentFromPlace(placeId, commentId, ownerId) {
    if (!commentId || !isValid(commentId)) {
        throw createValidationError(`Place ${errorMessages.notFound}`, 404);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const comment = await Comment.findById(commentId).exec();

        if (!comment) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (!comment.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const place = await Place.deletePlaceCommentAndRating({
            placeId,
            commentId,
            session,
            data: {
                numRate: comment.rating > 0 ? 1 : 0,
                comment,
                ownerId,
            },
        });

        // avg place rating
        const averageRating = calcAverageRating(place.rating, 0);

        const promises = [
            Comment.findByIdAndDelete(commentId, { session }).exec(),
            UserActivity.updateOne(
                { userId: ownerId },
                { $pull: { comments: { place: placeId } } },
                { session }
            ),
        ];

        await Promise.all(promises);
        await session.commitTransaction();

        return { averageRating, message: 'Comment deleted 🦖' };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deleteCommentFromPlace;
