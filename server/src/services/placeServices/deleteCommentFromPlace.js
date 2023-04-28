const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');

async function deleteCommentFromPlace(placeId, commentId, ownerId) {
    if (!commentId || !isValid(commentId)) {
        throw createValidationError(`Place ${errorMessages.notFound}`, 404);
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (!comment.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const place = await Place.findOneAndUpdate(
            { _id: placeId, comments: commentId },
            {
                $pull: {
                    comments: commentId,
                },
            },
            { session }
        );

        if (!place) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        await Comment.findByIdAndDelete(commentId, { session });
        await session.commitTransaction();

        return true;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deleteCommentFromPlace;