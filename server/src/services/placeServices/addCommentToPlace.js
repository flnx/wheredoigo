const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

// utils
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');
const { validateCommentFields } = require('../../utils/validateComment');

async function addCommentToPlace({ id, title, content, rating, user }) {
    validateCommentFields({ content, title, rating });
    const { ownerId, avatarUrl, username } = user;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const comment = new Comment({
            title: title.trim(),
            content: content.trim(),
            placeId: id,
            ownerId,
            rating,
        });

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

        const promises = [
            comment.save({ session }),
            UserActivity.addCommentActivity(ownerId, id, comment._id, session),
        ];

        await Promise.all(promises);
        await session.commitTransaction();

        // Calc average place rating
        const averageRating = calcAverageRating(place.rating, rating);

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
            averageRating,
        };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = addCommentToPlace;
