const UserActivity = require('../../models/userActivitiesSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getUserLastActivities(userId) {
    const result = await UserActivity.findOne({ userId: userId })
        .populate({
            path: 'likes.destination',
            select: 'city',
        })
        .lean()
        .exec();

    if (!result) {
        return {
            comments: [],
            likes: [],
            created: [],
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

    const hasNoActivity = likes.length == 0;

    return {
        likes,
        comments: [],
        creations: [],
        hasNoActivity
    };
}

module.exports = getUserLastActivities;
