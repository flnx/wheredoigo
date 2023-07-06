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

    try {
        // Delete the images from cloudinary
        await deleteImages(publicImgIds, folderNames);
    } catch (err) {
        console.log(err.message || err);
    }

    return {
        message: 'deleted 🦖',
    };
}

async function proceedDeletion({ destinationId, commentsIds, placesIds }) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const promises = [
            Destination.findByIdAndDelete(destinationId).session(session),
            Place.deleteMany({ destinationId }).session(session),
            Comment.deleteMany({ _id: { $in: commentsIds } }).session(session),
            UserActivity.updateMany(
                {},
                {
                    $pull: {
                        likes: { destination: destinationId },
                        comments: { place: { $in: placesIds } },
                    },
                }
            ).session(session),
        ];

        await Promise.all(promises);
        await session.commitTransaction();

        return true;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deleteDestination;
