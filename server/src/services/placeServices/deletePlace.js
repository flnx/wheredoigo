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

    await proceedDeletion({ placeId, commentIds });
    await deletePlaceImages(place);

    return {
        message: 'Deleted 🦖',
    };

    async function deletePlaceImages(place) {
        try {
            // Extract the correct cloudinary folder name
            const folderName = extractCloudinaryFolderName(
                'places',
                place.city,
                placeId
            );

            // Extract all cloudinary image public ids for the specific place
            const image_ids = place.imageUrls.map(({ public_id }) => public_id);

            deleteImages(image_ids, [folderName]);
            return true;
        } catch (err) {
            // Just log the error. The rest is handled with deleteImages
            console.error(err.message || err);
        }
    }
}

async function proceedDeletion({ placeId, commentIds }) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // Delete place
        const place = await Place.findByIdAndDelete(placeId).session(session);

        if (!place) {
            throw createValidationError(errorMessages.serverError, 500);
        }

        // Delete all place comments
        const comments = await Comment.deleteMany({
            _id: { $in: commentIds },
        }).session(session);

        if (comments.deletedCount !== commentIds.length) {
            throw createValidationError(errorMessages.serverError, 500);
        }

        // Remove all user activities related to that place (comments)
        await UserActivity.updateMany(
            {},
            { $pull: { comments: { place: placeId } } }
        ).session(session);

        await session.commitTransaction();

        return true;
    } catch (err) {
        // console.log(err || err.message);
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

module.exports = deletePlace;
