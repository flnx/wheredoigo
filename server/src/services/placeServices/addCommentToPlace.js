const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');

async function addCommentToPlace({ id, title, content, rating, user }) {
    // Extract user information
    const { ownerId } = user;

    // Start a database session
    const session = await mongoose.startSession();

    try {
        let result;
        
        await session.withTransaction(async () => {
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
                    commentId: comment._id,
                    rating,
                },
                session,
            });

            // Save the comment and add user activity
            await comment.save({ session });
            await UserActivity.addCommentActivity(ownerId, id, comment._id, session);

            // Return the comment details along with owner information and average rating
            result = {
                averageRating: place.averageRating,
            };
        });
        
        return result;
    } catch (err) {
        console.error(err.message || err);
        throw createValidationError(errorMessages.validation.comment.addFailed);
    } finally {
        // End the session
        session.endSession();
    }
}

module.exports = addCommentToPlace;
