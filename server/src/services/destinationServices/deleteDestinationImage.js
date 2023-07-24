const Destination = require('../../models/destinationSchema');

const { errorMessages } = require('../../constants/errorMessages');
const { deleteImages } = require('../cloudinaryService/deleteImages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');

// Query
const deleteImageQuery = require('../../queries/deleteImageQuery');

async function deleteDestinationImage(destinationId, imgId) {
    const query = deleteImageQuery(destinationId, imgId);

    // Finds the requested image by its ID, deletes it and returns the deleted result
    const result = await Destination.findOneAndUpdate(...query)
        .lean()
        .exec();

    if (!result) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    // Extracts the public ID
    const public_id = result.imageUrls[0]?.public_id;

    // Deletes the old Image
    deleteImages([public_id]).catch((err) => console.error(err.message || err));

    return {
        deleted: true,
    };
}

module.exports = deleteDestinationImage;
