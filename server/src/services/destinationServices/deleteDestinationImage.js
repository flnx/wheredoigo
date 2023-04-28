const Destination = require('../../models/destinationSchema');

const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { deleteImage } = require('../../utils/cloudinaryUploader');

async function deleteDestinationImage(destinationId, imgId) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const result = await Destination.updateOne(
        { _id: destinationId },
        { $pull: { imageUrls: { _id: imgId } } }
    )
        .lean()
        .exec();

    let cloudinary_error = null;

    try {
        await deleteImage(imageData.public_id);
    } catch (err) {
        cloudinary_error = err.message;
    }

    if (!result ||  result.matchedCount === 0) {
        throw createValidationError(
            errorMessages.couldNotDelete(`Image with ID: ${imgId}`),
            404
        );
    }

    result.cloud_error = cloudinary_error;
    return result;
}

module.exports = deleteDestinationImage;
