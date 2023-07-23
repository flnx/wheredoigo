const Place = require('../../models/placeSchema');

// Utils
const { createValidationError } = require('../../utils/createValidationError');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

async function editPlaceType({ id, type }) {
    const result = await Place.updateOne({ _id: id }, { $set: { type } })
        .lean()
        .exec();

    if (!result || result.matchedCount !== 1) {
        throw createValidationError(errorMessages.data.notEdited, 400);
    }

    return result;
}

module.exports = editPlaceType;
