const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

const { createValidationError } = require('../../utils/createValidationError');

async function editCategories({ id, categories }) {
    const result = await Destination.updateOne(
        { _id: id },
        { $set: { category: categories } }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount !== 1) {
        throw createValidationError(errorMessages.data.notEdited, 400);
    }

    return result;
}

module.exports = editCategories;
