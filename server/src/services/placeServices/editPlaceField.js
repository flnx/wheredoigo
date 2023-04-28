const Place = require('../../models/placeSchema');

const { errorMessages } = require('../../constants/errorMessages');
const { allowedFieldsToUpdate } = require('../../constants/allowedPlaceCategories');

// utils
const { validateFieldsOnEdit } = require('../../utils/validateFields');
const { createValidationError } = require('../../utils/createValidationError');

async function editPlaceField(placeId, updatedField) {
    const { description, infoId } = validateFieldsOnEdit(updatedField);


    if (!allowedFieldsToUpdate.includes(infoId)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const updated = {};
    updated[infoId] = description;

    const result = await Place.updateOne({ _id: placeId }, { $set: updated })
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.couldNotUpdate(infoId), 404);
    }

    return result;
}

module.exports = editPlaceField;
