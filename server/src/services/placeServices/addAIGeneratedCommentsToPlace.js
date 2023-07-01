const mongoose = require('mongoose');
const { errorMessages } = require('../../constants/errorMessages');

const Comment = require('../../models/commentSchema');
const Place = require('../../models/placeSchema');
const User = require('../../models/userSchema');

const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

const {
    generateAICommentsForCommentBots,
} = require('../openAI/generateAICommentsForCommentBots');

async function addAIGeneratedCommentsToPlace(place) {
    const name = capitalizeEachWord(place.name);
    const country = capitalizeEachWord(place.country);
    const city = capitalizeEachWord(place.city);
    const placeId = place._id.toString();

    const promises = [
        User.find({ role: 'commenter' }).select('_id'),
        Place.find({ _id: placeId }).select('commentedBy'),
    ];

    const [commenters, allPlaceCommenterIDs] = await Promise.all(promises);
    const { commentedBy } = allPlaceCommenterIDs[0];

    // If there's already a comment by a commenter on that place, it filters the commenter id out
    const filteredCommenters = commenters.filter(
        (c) => !commentedBy.includes(c._id)
    );

    const numOfCommenters = filteredCommenters.length;

    if (filteredCommenters == 0) {
        throw createValidationError(errorMessages.unavailable, 503);
    }

    const comments = await commentsGeneratedByAI({
        name,
        country,
        city,
        numOfCommenters,
    });

    const updatedComments = addPlaceAndOwnerIds({ comments, filteredCommenters, placeId });

    const result = await addCommentsToPlace(updatedComments, placeId);
    return result;
}

async function commentsGeneratedByAI({ name, country, city, numOfCommenters }) {
    let retryCount = 0;
    const MAX_RETRIES = 1;

    let comments;
    // retry mechanism if comment generation fails

    while (retryCount <= MAX_RETRIES) {
        try {
            comments = await generateAICommentsForCommentBots(
                city,
                name,
                country,
                numOfCommenters
            );
            return comments; // returns the result if the comments are successfully generated
        } catch (error) {
            retryCount++;

            if (retryCount <= MAX_RETRIES) {
                console.error(
                    `Failed to generate AI comments. Retrying... (Attempt ${retryCount})`
                );
                await delay(500); // 500ms delay before retrying
            } else {
                throw error;
            }
        }
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

function addPlaceAndOwnerIds({ comments, filteredCommenters, placeId }) {
    return comments
        .map((comment, i) => {
            const ownerId = filteredCommenters[i]._id;

            const commentData = {
                ...comment,
                placeId,
                ownerId,
            };

            if (commentData.rating && commentData.title && commentData.content) {
                return commentData;
            }
        })
        .filter(Boolean); // filters out the undefined (if any)
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

        return updateResult;
    } catch (error) {
        console.log(error.message);
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}
module.exports = {
    addAIGeneratedCommentsToPlace,
};
