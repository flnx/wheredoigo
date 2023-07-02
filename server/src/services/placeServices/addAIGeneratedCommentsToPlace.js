const mongoose = require('mongoose');
const { errorMessages } = require('../../constants/errorMessages');

const Comment = require('../../models/commentSchema');
const Place = require('../../models/placeSchema');
const User = require('../../models/userSchema');
const UserActivity = require('../../models/userActivitiesSchema');

const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');
const { commentsGeneratedByAI } = require('../openAI/commentsGeneratedByAI');
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');

async function addAIGeneratedCommentsToPlace(place) {
    const { rating } = place;
    const name = capitalizeEachWord(place.name);
    const country = capitalizeEachWord(place.country);
    const city = capitalizeEachWord(place.city);
    const placeId = place._id.toString();

    const promises = [
        User.find({ role: 'commenter' }).select('_id').lean().exec(),
        Place.findById(placeId).select('commentedBy').lean().exec(),
    ];

    const [commenters, placeCommenterIds] = await Promise.all(promises);

    const commentedBy = placeCommenterIds.commentedBy.map((id) => id.toString());

    // If there's already a comment by a commenter on that place, it filters the commenter id out
    const filteredCommenters = commenters.filter(
        (c) => !commentedBy.includes(c._id.toString())
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

    const updatedComments = attachPlaceAndOwnerIDsToComments({
        comments,
        filteredCommenters,
        placeId,
    });

    if (updatedComments.length == 0) {
        console.error('AddAIGeneratedCommentsToPlace: GPT Object Error')
        throw createValidationError(errorMessages.serverError, 500);
    }

    const { 
        updateResult, 
        commentIds, 
        ownerIds, 
        commentRatingSum, 
        numOfComments 
    } = await addCommentsToPlace(updatedComments, placeId);

    // Recalculating the avg place rating (to return in on the client)
    const averageRating = calcAverageRating(rating, commentRatingSum, numOfComments);

    addUsersActivities(ownerIds, placeId, commentIds);

    return {
        ...updateResult,
        averageRating,
        hasAIComments: true
    };
}

function attachPlaceAndOwnerIDsToComments({
    comments,
    filteredCommenters,
    placeId,
}) {
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

        return {
            updateResult,
            commentIds,
            ownerIds,
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

async function addUsersActivities(userIds, placeId, commentIds) {
    const updates = userIds.map((userId, index) => ({
        updateOne: {
            filter: { userId },
            update: {
                $push: {
                    comments: {
                        $each: [
                            {
                                place: placeId,
                                comment: commentIds[index],
                                timestamp: Date.now(),
                            },
                        ],
                        $slice: -3, // Keep only the first 3 comments
                    },
                },
            },
            upsert: true,
        },
    }));

    try {
        await UserActivity.bulkWrite(updates);
        return true;
    } catch (err) {
        console.log(err.message);
        return err?.message;
    }
}

module.exports = {
    addAIGeneratedCommentsToPlace,
};
