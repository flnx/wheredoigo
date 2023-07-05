const mongoose = require('mongoose');

const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const UserActivity = require('../../models/userActivitiesSchema');

const { errorMessages } = require('../../constants/errorMessages');

// utils
const { deleteMultipleImages } = require('../../utils/cloudinaryUploader');
const { createValidationError } = require('../../utils/createValidationError');
const { extractCloudinaryFolderName } = require('../../utils/utils');

async function deletePlace(placeId, user) {
    const { ownerId, role } = user;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const place = await Place.findById(placeId).session(session).exec();

        if (!place) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        // Allow admin role to bypass access check
        if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const comments_ids = place.comments.map((id) => id.toString());
        
        const promises = [
            Place.findByIdAndDelete(placeId).session(session),
            Comment.deleteMany({ _id: { $in: comments_ids } }).session(session),
            UserActivity.updateMany({}, { $pull: { comments: { place: placeId } } }).session(session)
        ]

        await Promise.all(promises);
        deletePlaceImages();

        await session.commitTransaction();

        return {
            message: 'Deleted 🦖'
        };

    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }

    async function deletePlaceImages() {
        try {
            // Extract the correct cloudinary folder name
            const path = 'places';
            let { city } = place;
            const folderName = extractCloudinaryFolderName(path, city, placeId);

            // Extract all cloudinary image public ids for the specific place
            const image_ids = place.imageUrls.map(
                ({ public_id, ...rest }) => public_id
            );

            await deleteMultipleImages(image_ids, [folderName]);
        } catch (err) {
            // Thats not needed since deleteMultipleImages handles the deletion itself..
            // ...andt he failed images public ids are uploaded to DB (to retry deletion later)
            // .. the log is still useful to check that some errors occured
            console.error(err.message || err);
        }
    }
}

module.exports = deletePlace;
