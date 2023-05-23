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
            return UserActivity.create({
                userId,
                likes: [{ destination: id }],
                comments: [],
            });
        }

        if (userActivity.likes.length >= 3) {
            userActivity.likes.shift(); // Remove the oldest like activity if there's more than 3 (stores up to 3 activities)
        }

        userActivity.likes.push({ destination: id }); // Adds new like activity

        try {
            await userActivity.save();
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = likeDestination;
