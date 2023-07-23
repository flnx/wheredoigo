const Place = require('../../models/placeSchema');
const validator = require('validator');

// Utils
const { createValidationError } = require('../../utils/createValidationError');

// Constants
const { errorMessages } = require('../../constants/errorMessages');
const { removeHtmlTags } = require('../../utils/validators/sanitizeHtmlString');

async function editPlaceName({ id, name }) {
    const clean = removeHtmlTags(name);

    if (!validator.isLength(clean.trim(), { min: 1, max: 60 })) {
        throw createValidationError(errorMessages.validation.placeName, 400);
    }

    const result = await Place.updateOne({ _id: id }, { $set: { name: clean } })
        .lean()
        .exec();

    if (!result || result.matchedCount !== 1) {
        throw createValidationError(errorMessages.data.notEdited, 400);
    }

    return { name: clean };
}

module.exports = editPlaceName;
