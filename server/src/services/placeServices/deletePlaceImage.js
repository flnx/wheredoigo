const Place = require('../../models/placeSchema');

const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { deleteImage } = require('../../utils/cloudinaryUploader');

async function deletePlaceImage(placeId, imgId) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const result = await Place.findOneAndUpdate(
        { _id: placeId, 'imageUrls._id': imgId },
        { $pull: { imageUrls: { _id: imgId } } },
        {
            projection: { imageUrls: 1 },
        }
    )
        .lean()
        .exec();

    if (!result) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const deletedImage = result.imageUrls.find(({ _id }) => _id.equals(imgId));

    if (!deletedImage) {
        throw createValidationError(errorMessages.couldNotDelete(`this image`), 404);
    }

    const { public_id } = deletedImage;
    
    let cloudinary_error = null;

    try {
        await deleteImage(public_id);
    } catch (err) {
        cloudinary_error = err.message;
    }

    result.cloud_error = cloudinary_error;
    return result;
}

module.exports = deletePlaceImage;
