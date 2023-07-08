const mongoose = require('mongoose');

// Models
const Destination = require('../../models/destinationSchema');
const Place = require('../../models/placeSchema');
const UserActivity = require('../../models/userActivitiesSchema');
const Comment = require('../../models/commentSchema');

const { deleteImages } = require('../cloudinaryService/deleteImages');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const extractMultipleFolderNames = require('../../utils/cloudinary/extractMultipleFolderNames');
const extractAllPublicIds = require('../../utils/cloudinary/extractImagesPublicIds');

async function deleteDestination(destinationId, user) {
    const { ownerId, role } = user;

    // Find the destination and its places
    const promises = [
        Destination.findById(destinationId).exec(),
        Place.find({ destinationId }).select('-description').exec(),
    ];

    const [destination, places] = await Promise.all(promises);

    if (!destination) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    // Allow admin role to bypass access check
    if (role !== 'admin' && !destination.ownerId.equals(ownerId)) {
        throw createValidationError(errorMessages.auth.accessDenied, 403);
    }

    // Extract Public IDS
    const publicImgIds = extractAllPublicIds(destination, places);

    // Extract Folder Names
    const folderNames = extractMultipleFolderNames(
        destination.city,
        destinationId,
        places
    );

    // Extract comments ids from all places
    const commentsIds = places.flatMap((p) =>
        p.comments.map((commendId) => commendId.toString())
    );

    // Extract placesIds
    const placesIds = places.map((x) => x._id);

    // Delete destination and places
    await proceedDeletion({
        destinationId,
        commentsIds,
        placesIds,
        publicImgIds,
        folderNames,
    });

    return {
        message: 'deleted 🦖',
    };
}

async function proceedDeletion({
    destinationId,
    commentsIds,
    placesIds,
    publicImgIds,
    folderNames,
}) {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            // Delete destination
            const dest = await Destination.findByIdAndDelete(destinationId).session(
                session
            );

            if (!dest) {
                throw new Error(errorMessages.data.notFound);
            }

            // Delete destination places
            const places = await Place.deleteMany({ destinationId }).session(
                session
            );

            if (places.deletedCount !== placesIds.length) {
                throw new Error(errorMessages.transaction('places'));
            }

            // Delete all comments related to their places
            const comments = await Comment.deleteMany({
                _id: { $in: commentsIds },
            }).session(session);

            if (comments.deletedCount !== commentsIds.length) {
                throw new Error(errorMessages.transaction('comments'));
            }

            // Remove all user activities related to that destination and its places (likes/comments)
            await UserActivity.updateMany(
                {},
                {
                    $pull: {
                        likes: { destination: destinationId },
                        comments: { place: { $in: placesIds } },
                    },
                }
            ).session(session);

            // Deletes the images
            await deleteImages(publicImgIds, folderNames);
                
        });

        return true;
    } catch (err) {
        console.error(err.message || err);
        throw createValidationError(errorMessages.request.server);
    } finally {
        await session.endSession();
    }
}

module.exports = deleteDestination;
