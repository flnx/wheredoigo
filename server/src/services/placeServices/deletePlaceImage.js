const Place = require('../../models/placeSchema');
const { isValid } = require('mongoose').Types.ObjectId;
const { errorMessages } = require('../../constants/errorMessages');

// Query
const deleteImageQuery = require('../../queries/deleteImageQuery');

// Service
const { deleteImages } = require('../cloudinaryService/deleteImages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');


async function deletePlaceImage(placeId, imgId) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const query = deleteImageQuery(placeId, imgId);
    const result = await Place.findOneAndUpdate(...query)
        .lean()
        .exec();

    if (!result) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // Extracts the public ID
    const public_id = result.imageUrls[0]?.public_id;

    // Deletes the old image
    deleteImages([public_id]).catch((err) => console.log(err.message || err));

    return result;
}

module.exports = deletePlaceImage;
