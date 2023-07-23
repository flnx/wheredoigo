const Place = require('../../models/placeSchema');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { sanitizeHtmlString } = require('../../utils/validators/sanitizeHtmlString');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

async function editPlaceDescription({ id, description }) {
    const sanitized = sanitizeHtmlString(description);

    const result = await Place.updateOne(
        { _id: id },
        {
            $set: { description: sanitized },
        }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount !== 1) {
        throw createValidationError(errorMessages.data.notEdited, 400);
    }

    return result;
}

module.exports = editPlaceDescription;
