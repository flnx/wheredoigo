const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { deleteMultipleImages } = require('../../utils/cloudinaryUploader');
const { createValidationError } = require('../../utils/createValidationError');
const { extractCloudinaryFolderName } = require('../../utils/utils');
const UserActivity = require('../../models/userActivitiesSchema');

async function deletePlace(placeId, userId) {
    const place = await Place.findById(placeId).lean().exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!place.ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    const comments_ids = place.comments.map((c) => c.toString());

    // get correct cloudinary folder name
    const path = 'places';
    let { city } = place;
    const folderName = extractCloudinaryFolderName(path, city, placeId);

    // extract all cloudinary public ids for the specific place
    const image_ids = place.imageUrls.map(({ public_id, ...rest }) => public_id);

    await Place.findByIdAndDelete(placeId);

    await Promise.allSettled([
        Comment.deleteMany({ _id: { $in: comments_ids } }),
        deleteMultipleImages(image_ids, [folderName]),
        UserActivity.updateMany({}, { $pull: { comments: { place: placeId } } }),
    ]);

    return true;
}

module.exports = deletePlace;
