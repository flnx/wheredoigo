const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
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
        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (!comment.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const numRate = comment.rating > 0 ? 1 : 0;

        const place = await updatePlaceWithRetry(placeId, commentId, numRate, comment, session, ownerId);

        if (!place) {
            throw createValidationError(errorMessages.notFound, 404);
        }
        
        // return the current avg place rating
        const averageRating = calcAverageRating(place.rating, 0);

        await Comment.findByIdAndDelete(commentId, { session });
        await session.commitTransaction();

        return {
            averageRating,
            message: "Comment deleted 🦖"
        };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

async function updatePlaceWithRetry(placeId, commentId, numRate, comment, session, ownerId) {
    let retries = 3;
    let delay = 100;

    while (retries > 0) {
        try {
            const place = await updatePlace(placeId, commentId, numRate, comment, session, ownerId);

            if (!place) {
                throw createValidationError(errorMessages.notFound, 404);
            }

            return place;
        } catch (err) {
            if (err.code === 11000 && retries > 0) {
                retries--;
                delay *= 2;
                await new Promise((resolve) => setTimeout(resolve, delay));
                continue;
            }
            
            throw err;
        }
    }

    throw createValidationError(errorMessages.couldNotUpdate('place'), 500);
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
                __v: 1,
            },
        },
        { session, new: true, select: 'rating' }
    ).lean().exec();
}

module.exports = deleteCommentFromPlace;
