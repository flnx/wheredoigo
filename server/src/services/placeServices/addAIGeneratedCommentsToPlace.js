const mongoose = require('mongoose');
const { errorMessages } = require('../../constants/errorMessages');

const Comment = require('../../models/commentSchema');
const Place = require('../../models/placeSchema');

const { createValidationError } = require('../../utils/createValidationError');
const { commentsGeneratedByAI } = require('../openAI/commentsGeneratedByAI');
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');
const { attachIDsToComments } = require('../../utils/attachIDsToComments');

async function addAIGeneratedCommentsToPlace(place, commenters) {
    const placeId = place._id.toString();

    const placeDataToComment = {
        name: place.capitalizedName,
        country: place.capitalizedCountry,
        city: place.capitalizedCity,
        numOfCommenters: commenters.length,
    };

    const comments = await commentsGeneratedByAI(placeDataToComment);

    const updatedComments = attachIDsToComments({
        comments,
        commenters,
        placeId,
    });

    const { 
        updateResult, 
        commentRatingSum, 
        numOfComments 
    } = await addCommentsToPlace(updatedComments, placeId);

    const averageRating = calcAverageRating(
        place.rating,
        commentRatingSum,
        numOfComments
    );

    return {
        ...updateResult,
        averageRating,
        averageRating: place.averageRating,
        hasAIComments: true,
    };
}

async function addCommentsToPlace(comments, placeId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const addedComments = await Comment.insertMany(comments, { session });

        const commentIds = addedComments.map((comment) => comment._id);
        const ownerIds = addedComments.map((comment) => comment.ownerId);
        const commentRatingSum = addedComments.reduce((sum, c) => sum + c.rating, 0);

        const filter = {
            _id: placeId,
            commentedBy: { $not: { $in: ownerIds } },
        };

        const update = {
            $push: {
                comments: { $each: commentIds },
                commentedBy: { $each: ownerIds },
            },
            $inc: {
                'rating.numRates': addedComments.length,
                'rating.sumOfRates': commentRatingSum,
            },
        };

        const updateResult = await Place.updateOne(filter, update, { session });

        if (updateResult.modifiedCount !== 1) {
            throw createValidationError(errorMessages.unavailable, 503);
        }

        await session.commitTransaction();

        return {
            updateResult,
            commentRatingSum,
            numOfComments: addedComments.length,
        };
    } catch (error) {
        console.log(`addCommentsToPlace - ${error.message}`);
        await session.abortTransaction();
        throw createValidationError(errorMessages.serverError, 500);
    } finally {
        session.endSession();
    }
}

module.exports = {
    addAIGeneratedCommentsToPlace,
};
