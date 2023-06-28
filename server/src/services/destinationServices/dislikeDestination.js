const Destination = require('../../models/destinationSchema');
const UserActivity = require('../../models/userActivitiesSchema');

async function dislikeDestination(id, userId) {
    const result = await Destination.updateOne(
        { _id: id },
        { $pull: { likes: userId }, $inc: { likesCount: -1 } }
    );
    // removes the last like activity upon dislike success (no need to await)
    if (result.modifiedCount == 1) {
        UserActivity.updateOne(
            { userId: userId },
            { $pull: { likes: { destination: id } } }
        ).catch((err) => console.log(err));
    }

    return result;
}

module.exports = dislikeDestination;
