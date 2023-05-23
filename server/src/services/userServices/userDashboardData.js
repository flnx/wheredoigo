const Comment = require('../../models/commentSchema');
const Destination = require('../../models/destinationSchema');

async function userDashboardData(userId) {
    const promises = [
        Comment.countDocuments({ ownerId: userId }).lean().exec(),
        Destination.countDocuments({ ownerId: userId }).lean().exec(),
        Destination.countDocuments({ likes: { $elemMatch: { $eq: userId } } })
            .lean()
            .exec(),
    ];

    const [countComments, countCreated, countFavorites] = await Promise.all(
        promises
    );

    return {
        countComments,
        countCreated,
        countFavorites,
    };
}

module.exports = userDashboardData;
