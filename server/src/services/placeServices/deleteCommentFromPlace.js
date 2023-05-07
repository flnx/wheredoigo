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

    let retries = 3;
    let delay = 100; // initial delay of 100ms

    while (retries > 0) {
        try {
            session.startTransaction();

            const comment = await Comment.findById(commentId);

            if (!comment) {
                throw createValidationError(errorMessages.notFound, 404);
            }

            if (!comment.ownerId.equals(ownerId)) {
                throw createValidationError(errorMessages.accessDenied, 403);
            }

            const numRate = comment.rating > 0 ? 1 : 0;

            const place = await updatePlace(
                placeId,
                commentId,
                numRate,
                comment,
                session,
                ownerId
            );

            console.log(place);

            if (!place) {
                throw createValidationError(errorMessages.notFound, 404);
            }

            await Comment.findByIdAndDelete(commentId, { session });
            await session.commitTransaction();

            return true;
        } catch (err) {
            await session.abortTransaction();

            if (
                err.code === 11000 &&
                err.codeName === 'DuplicateKey' &&
                retries > 0
            ) {
                retries--;
                // exponential backoff
                delay *= 2;
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }

            throw err;
        } finally {
            session.endSession();
        }
    }

    throw createValidationError(errorMessages.couldNotDelete('this comment'), 404);
}

async function updatePlace(placeId, commentId, numRate, comment, session, ownerId) {
    return Place.findOneAndUpdate(
        { _id: placeId, comments: commentId },
        {
            $pull: {
                comments: commentId,
                commentedBy: ownerId,
            },
            $inc: {
                'rating.numRates': -numRate,
                'rating.sumOfRates': -comment.rating,
            },
        },
        { session }
    );
}

module.exports = deleteCommentFromPlace;
