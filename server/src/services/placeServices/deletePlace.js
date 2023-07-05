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

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const place = await Place.findById(placeId).exec();

        if (!place) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        // Allow admin role to bypass access check
        if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        // Extract the comment ids
        const comments_ids = place.comments.map((id) => id.toString());

        const promises = [
            Place.findByIdAndDelete(placeId).session(session),
            Comment.deleteMany({ _id: { $in: comments_ids } }).session(session),
            UserActivity.updateMany({}, { $pull: { comments: { place: placeId } } } ).session(session),
        ];

        await Promise.all(promises);
        await session.commitTransaction();

        deletePlaceImages(place);

        return {
            message: 'Deleted 🦖',
        };
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }

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

            await deleteImages(image_ids, [folderName]);
        } catch (err) {
            // Just log the error. The rest is handled with deleteImages
            console.error(err.message || err);
        }
    }
}

module.exports = deletePlace;
