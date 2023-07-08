const Place = require('../../models/placeSchema');

// Utils
const { validatePlaceFieldOnEdit } = require('../../utils/validateFields');
const { createValidationError } = require('../../utils/createValidationError');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

async function editPlaceField(placeId, updatedField) {
    const { description, infoId } = validatePlaceFieldOnEdit(updatedField);

    const updated = {};
    updated[infoId] = description;

    const result = await Place.updateOne({ _id: placeId }, { $set: updated })
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }

    return result;
}

module.exports = editPlaceField;
