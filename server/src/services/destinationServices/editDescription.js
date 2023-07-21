const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { sanitizeHtmlString } = require('../../utils/validators/sanitizeHtmlString');

async function editDescription({ id, description }) {
    const sanitizedDescription = sanitizeHtmlString(description);

    const result = await Destination.updateOne(
        {
            _id: id,
        },
        {
            $set: { description: sanitizedDescription },
        }
    )
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }


    console.log(result);

    return result;
}

module.exports = {
    editDescription,
};
