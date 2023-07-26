const UserActivity = require('../../models/userActivitiesSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getUserLastActivities(userId) {
    const result = await UserActivity.findOne({ userId: userId })
        .populate([
            {
                path: 'likes.destination',
                select: 'city',
            },
            {
                path: 'comments.place',
                select: 'name',
            },
            {
                path: 'comments.comment',
                select: 'title content rating',
            },
        ])
        .lean()
        .exec();

    if (!result) {
        return {
            comments: [],
            likes: [],
            hasNoActivity: true,
        };
    }

    const options = { day: 'numeric', month: 'long', year: 'numeric' };

    const likes = result.likes.map((x) => ({
        destinationId: x.destination._id,
        city: capitalizeEachWord(x.destination.city),
        date: x.timestamp.toLocaleDateString(undefined, options),
        time: x.timestamp.toLocaleTimeString(),
    }));

    const comments = result.comments.map((x) => ({
        placeId: x.place._id,
        name: capitalizeEachWord(x.place.name),
        title: x.comment.title,
        content: x.comment.content,
        rating: x.comment.rating,
        date: x.timestamp.toLocaleDateString(undefined, options),
        time: x.timestamp.toLocaleTimeString(),
    }));

    const hasNoActivity = likes.length == 0 && comments.length == 0;

    return {
        likes,
        comments,
        hasNoActivity,
    };
}

module.exports = getUserLastActivities;
