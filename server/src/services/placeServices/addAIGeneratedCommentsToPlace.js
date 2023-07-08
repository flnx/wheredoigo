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

    // Using virtuals
    const placeDataToComment = {
        name: place.capitalizedName,
        country: place.capitalizedCountry,
        city: place.capitalizedCity,
        numOfCommenters: commenters.length,
    };

    // Generate comments using AI model
    const comments = await commentsGeneratedByAI(placeDataToComment);

    // Attach IDs to the comments
    const updatedComments = attachIDsToComments({
        comments,
        commenters,
        placeId,
    });

    // Add the updated comments to the place
    const { 
        updateResult, 
        commentRatingSum, 
        numOfComments 
    } = await addCommentsToPlace(updatedComments, placeId);

    // Calculate the new average rating for the place
    const averageRating = calcAverageRating(
        place.rating,
        commentRatingSum,
        numOfComments
    );

    // Return the result with updated fields
    return {
        ...updateResult,
        averageRating,
        averageRating: place.averageRating,
        hasAIComments: true,
    };
}

async function addCommentsToPlace(comments, placeId) {
    // Start a database session
    const session = await mongoose.startSession();

    try {
        let result;

        await session.withTransaction(async () => {
            // Insert the comments into the Comment collection (with the session)
            const addedComments = await Comment.insertMany(comments, { session });

            // Extract comment IDs and owner IDs from added comments
            const commentIds = addedComments.map((comment) => comment._id);
            const ownerIds = addedComments.map((comment) => comment.ownerId);

            // Calculate the sum of comment ratings
            const commentRatingSum = addedComments.reduce(
                (sum, c) => sum + c.rating,
                0
            );

            // Prepare the filter and update objects for updating the Place collection
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

            // Update the place document with the new comments and ratings
            const updateResult = await Place.updateOne(filter, update, { session });

            // Throw an error if the update operation does not modify exactly one document
            if (updateResult.modifiedCount !== 1) {
                throw createValidationError(errorMessages.unavailable, 503);
            }

            // Return the update result along with comment rating sum and number of comments
            result = {
                updateResult,
                commentRatingSum,
                numOfComments: addedComments.length,
            };
        });

        return result;
    } catch (error) {
        console.error(`addCommentsToPlace - ${error.message}`);
        throw createValidationError(errorMessages.request.server, 500);
    } finally {
        // End the session
        await session.endSession();
    }
}

module.exports = {
    addAIGeneratedCommentsToPlace,
};
