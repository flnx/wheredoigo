const Destination = require('../../models/destinationSchema');

async function likeDestination(id, userId) {
    const result = await Destination.updateOne(
        {
            _id: id,
            'likes.userId': { $ne: userId },
        },
        { $addToSet: { likes: { userId: userId, timestamp: new Date() } } }
    );

    return result;
}

module.exports = likeDestination;
