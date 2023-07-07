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
        throw createValidationError(errorMessages.notFound, 404);
    }

    // Allow admin role to bypass access check
    if (role !== 'admin' && !destination.ownerId.equals(ownerId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
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
    });

    // Deletes the images
    deleteImages(publicImgIds, folderNames).catch(() => {});

    return {
        message: 'deleted 🦖',
    };
}

async function proceedDeletion({ destinationId, commentsIds, placesIds }) {
    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        // Delete destination
        const dest = await Destination.findByIdAndDelete(destinationId).session(
            session
        );

        if (!dest) {
            throw createValidationError(errorMessages.serverError, 500);
        }

        // Delete destination places
        const places = await Place.deleteMany({ destinationId }).session(session);

        if (places.deletedCount !== placesIds.length) {
            throw createValidationError(errorMessages.serverError, 500);
        }

        // Delete all comments related to their places
        const comments = await Comment.deleteMany({ _id: { $in: commentsIds } }).session(session);

        if (comments.deletedCount !== commentsIds.length) {
            throw createValidationError(errorMessages.serverError, 500);
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

        await session.commitTransaction();

        return;
    } catch (err) {
        // console.log(err || err.message);
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deleteDestination;
