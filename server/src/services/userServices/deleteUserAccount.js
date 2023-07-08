const User = require('../../models/userSchema');
const Destination = require('../../models/destinationSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

const deleteUserAvatar = require('../cloudinaryService/deleteUserAvatar');
const deleteDestination = require('../destinationServices/deleteDestination');
const deleteCommentFromPlace = require('../placeServices/deleteCommentFromPlace');

const { errorMessages } = require('../../constants/errorMessages');
const { createValidationError } = require('../../utils/createValidationError');


async function deleteUserAccount(userData) {
    const { ownerId } = userData;

    const promises = [
        User.findById(ownerId).lean().exec(),
        Destination.find({ ownerId: ownerId }).select('ownerId').lean().exec(),
        Comment.find({ ownerId: ownerId }).select('placeId').lean().exec(),
    ];

    const [user, destinations, comments] = await Promise.all(promises);

    if (!user) {
        throw createValidationError(errorMessages.auth.unauthorized, 401);
    }

    await deleteDestinations();
    deleteUserAvatar(user.avatar_id);
    deleteUserComments();
    deleteActivities();

    const deletedUser = await User.findByIdAndDelete(ownerId);

    if (!deletedUser) {
        throw createValidationError(errorMessages.request.server, 500);
    }

    return true;

    async function deleteDestinations() {
        if (destinations.length > 0) {
            const deletedPromises = destinations.map((x) =>
                deleteDestination(x._id.toString(), ownerId)
            );

            const results = await Promise.allSettled(deletedPromises);

            results.forEach((result) => {
                if (result.status == 'rejected') {
                    console.error(result.reason);
                }
            });
        }
    }

    function deleteActivities() {
        const activityPromises = [
            Destination.updateMany(
                { likes: ownerId },
                { $pull: { likes: ownerId }, $inc: { likesCount: -1 } }
            ).exec(),
            UserActivity.deleteOne({ userId: ownerId }).exec(),
        ];

        Promise.allSettled(activityPromises).then((results) => {
            results.forEach((result) => {
                if (result.status == 'rejected') {
                    console.error(result.reason);
                }
            });
        });
    }

    function deleteUserComments() {
        if (comments.length > 0) {
            const deletedPromises = comments.map((x) =>
                deleteCommentFromPlace(
                    x.placeId.toString(),
                    x._id.toString(),
                    ownerId
                )
            );

            Promise.allSettled(deletedPromises).then((results) => {
                results.forEach((result) => {
                    if (result.status == 'rejected') {
                        console.error(result.reason);
                    }
                });
            });
        }
    }
}

module.exports = deleteUserAccount;
