const Destination = require('../../models/destinationSchema');

async function getUserLastActivities(destinationId, userId) {
    const result = await Destination.aggregate([
        { $match: { 'likes.userId': userId } },
        { $unwind: '$likes' },
        { $match: { 'likes.userId': userId } },
        { $sort: { 'likes.timestamp': -1 } },
        { $limit: 3 },
        { $group: { _id: '$_id', likes: { $push: '$likes' } } },
    ]);

    return result[0]?.likes || [];
}

module.exports = getUserLastActivities;
