const Destination = require('../../models/destinationSchema');
const UserActivity = require('../../models/userActivitiesSchema');

async function likeDestination(id, userId) {
    const result = await Destination.updateOne(
        { _id: id },
        { $addToSet: { likes: userId } }
    );

    if (result.modifiedCount == 1) {
        // Don't need the result, so no need to wait the promise to get resolved
        addUserActivity();
    }

    return result;

    async function addUserActivity() {
        const userActivity = await UserActivity.findOne({ userId });

        // UserActivity does not exist, create a new one
        if (!userActivity) {
            return UserActivity.create({ userId, likes: [{ destination: id }] });
        }

        // UserActivity exists, check the number of likes
        if (userActivity.likes.length < 3) {
            // There are less than 3 likes, simply push the new like
            userActivity.likes.push({ destination: id });
        } else {
            // There are already 3 likes, replace the oldest one
            userActivity.likes.shift(); // Remove the oldest like activity
            userActivity.likes.push({ destination: id }); // Add new like activity
        }

        try {
            await userActivity.save();
            return true;
        } catch(err) {
            return false;
        }
    }
}

module.exports = likeDestination;
