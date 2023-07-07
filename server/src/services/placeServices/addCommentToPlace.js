const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

// utils
const { validateCommentFields } = require('../../utils/validateComment');
const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');

async function addCommentToPlace({ id, title, content, rating, user }) {
    // Validate comment fields
    validateCommentFields({ content, title, rating });

    // Extract user information
    const { ownerId, avatarUrl, username } = user;

    // Start a database session
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        
        // Create a new comment object
        const comment = new Comment({
            title: title.trim(),
            content: content.trim(),
            placeId: id,
            ownerId,
            rating,
        });

        // Add the comment to the place and update ratings
        const place = await Place.addPlaceCommentAndRating({
            id,
            ownerId,
            data: {
                numRate: rating > 0 ? 1 : 0,
                comment,
                rating,
            },
            session,
        });

        // Save the comment and add user activity
        await comment.save({ session }),
        await UserActivity.addCommentActivity(ownerId, id, comment._id, session),

        // Commit the transaction
        await session.commitTransaction();

        // Return the comment details along with owner information and average rating
        return {
            title: comment.title,
            content: comment.content,
            rating: comment.rating,
            _id: comment._id,
            time: comment.time,
            ownerId: {
                avatarUrl,
                username,
            },
            isOwner: true,
            averageRating: place.averageRating,
        };
    } catch (err) {
        console.error(err.message || err);
        // Abort the transaction if an error occurs
        await session.abortTransaction();
        throw createValidationError(errorMessages.serverError);
    } finally {
        // End the session
        session.endSession();
    }
}

module.exports = addCommentToPlace;
