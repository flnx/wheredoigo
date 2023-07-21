const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { sanitizeHtmlString } = require('../../utils/validators/sanitizeHtmlString');

async function editDetails({ id: destination_id, detail_id, description }) {
    const sanitizedDescription = sanitizeHtmlString(description, 0, 2000);

    const result = await Destination.updateOne(
        {
            _id: destination_id,
            'details._id': detail_id,
        },
        {
            $set: {
                'details.$.content': sanitizedDescription,
            },
        }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount !== 1) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }

    return result;
}

module.exports = editDetails;
