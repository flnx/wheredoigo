const { errorMessages } = require('../../constants/errorMessages');
const Destination = require('../../models/destinationSchema');
const UserActivity = require('../../models/userActivitiesSchema');
const { createValidationError } = require('../../utils/createValidationError');

async function dislikeDestination(id, userId) {
    const result = await Destination.updateOne(
        { _id: id },
        { $pull: { likes: userId }, $inc: { likesCount: -1 } }
    );
    // removes the last like activity upon dislike success (no need to await)
    if (result.modifiedCount == 0) {
        throw createValidationError(errorMessages.request.server, 500);
    }

    UserActivity.updateOne(
        { userId: userId },
        { $pull: { likes: { destination: id } } }
    ).catch((err) => console.error(err));

    return result;
}

module.exports = dislikeDestination;
