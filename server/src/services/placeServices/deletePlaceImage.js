const { isValid } = require('mongoose').Types.ObjectId;

const Place = require('../../models/placeSchema');
const FailedDeletion = require('../../models/failedImgDeletionSchema');

const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { deleteImage } = require('../../utils/cloudinaryUploader');

const deleteImageQuery = require('../../queries/deleteImageQuery');

async function deletePlaceImage(placeId, imgId) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const query = deleteImageQuery(placeId, imgId);
    const result = await Place.findOneAndUpdate(query).lean().exec();

    if (!result) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // Extracts the public ID
    const public_id = result.imageUrls[0]?.public_id;

    // There wouldn't be a case where the public_id is missing but just to make sure..
    if (public_id) {
        // Deletes the old image
        deleteImage(public_id).catch((err) => {
            // If the image deletion from cloudinary fails, it stores the public_id in DB (to delete it later)
            FailedDeletion.create({ public_ids: [public_id] }).catch((err) =>
                console.error(err?.message)
            );
        });
    }

    return result;
}

module.exports = deletePlaceImage;
