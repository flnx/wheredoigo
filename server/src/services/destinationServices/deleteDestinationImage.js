const { isValid } = require('mongoose').Types.ObjectId;

const Destination = require('../../models/destinationSchema');
const FailedDeletion = require('../../models/failedImgDeletionSchema');

const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { deleteImage } = require('../../utils/cloudinaryUploader');

const deleteImageQuery = require('../../queries/deleteImageQuery');

async function deleteDestinationImage(destinationId, imgId) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const query = deleteImageQuery(destinationId, imgId);

    // Finds the requested image by its ID, deletes it and returns the deleted result
    const result = await Destination.findOneAndUpdate(query).lean().exec();

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

    return {
        deleted: true,
    };
}

module.exports = deleteDestinationImage;
