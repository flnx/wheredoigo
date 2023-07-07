const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

// Service
const { deleteImages } = require('../cloudinaryService/deleteImages');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const extractCloudinaryFolderName = require('../../utils/cloudinary/extractFolderName');

async function deletePlace(placeId, user) {
    const { ownerId, role } = user;

    const place = await Place.findById(placeId).exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // Allow admin role to bypass access check
    if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    // Extract the comment ids
    const commentIds = place.comments.map((id) => id.toString());

    await proceedDeletion({ placeId, commentIds, place });

    return {
        message: 'Deleted 🦖',
    };
}

async function proceedDeletion({ placeId, commentIds }) {
    const session = await mongoose.startSession();

    try {
        await session.withTransaction(async () => {
            // Delete place
            const place = await Place.findByIdAndDelete(placeId).session(session);

            if (!place) {
                throw new Error(errorMessages.couldNotDelete('place'), 500);
            }

            // Delete all place comments
            const comments = await Comment.deleteMany({
                _id: { $in: commentIds },
            }).session(session);

            if (comments.deletedCount !== commentIds.length) {
                throw new Error(errorMessages.couldNotDelete('comments'), 500);
            }

            // Remove all user activities related to that place (comments)
            await UserActivity.updateMany(
                {},
                { $pull: { comments: { place: placeId } } }
            ).session(session);

            await deletePlaceImages(place, placeId);
        });
        
        return true;
    } catch (err) {
        console.error(err || err.message);
        throw createValidationError(errorMessages.serverError, 500);
    } finally {
        await session.endSession();
    }
}

async function deletePlaceImages(place, placeId) {
    const folderName = extractCloudinaryFolderName('places', place.city, placeId);

    // Extract all cloudinary image public ids for the specific place
    const image_ids = place.imageUrls.map(({ public_id }) => public_id);

    await deleteImages(image_ids, [folderName]);
    return true;
}

module.exports = deletePlace;
