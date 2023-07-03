const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

// utils
const { calcAverageRating } = require('../../utils/calcPlaceAvgRating');
const { validateCommentFields } = require('../../utils/validateComment');

async function addCommentToPlace({ id, title, content, rating, user }) {
    validateCommentFields({ content, title, rating });
    const { ownerId, avatarUrl, username } = user;

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        placeId: id,
        ownerId,
        rating,
    });

    const numRate = rating > 0 ? 1 : 0;

    const place = await Place.addPlaceCommentAndRating(
        id,
        ownerId,
        comment,
        numRate,
        rating
    );

    const promises = [
        comment.save(),
        UserActivity.updateCommentsActivity(ownerId, id, comment._id),
    ];

    await Promise.all(promises);

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
}

module.exports = addCommentToPlace;
