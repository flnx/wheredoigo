const Destination = require('../../models/destinationSchema');

const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { validateFieldsOnEdit } = require('../../utils/validateFields');

async function editDestinationField(destinationId, updatedFields) {
    const { description, categories, infoId, categoryId } = validateFieldsOnEdit(updatedFields);

    if (infoId.toLowerCase() == 'description') {
        const result = await editDescription(destinationId, description, infoId);

        return result;
    }

    if (categories) {
        const result = await editCategories(destinationId, categories);

        return result;
    }

    if (!categoryId || !isValid(infoId) || !isValid(categoryId)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const result = await editDetail(destinationId, categoryId, infoId, description);
    return result;
}

async function editCategories(destinationId, categories) {
    const result = await Destination.updateOne(
        { _id: destinationId },
        { $set: { category: categories } }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.couldNotUpdate(infoId), 404);
    }

    return result;
}

async function editDetail(destinationId, categoryId, infoId, updatedValue) {
    const result = await Destination.updateOne(
        {
            _id: destinationId,
            'details._id': categoryId,
            'details.info._id': infoId,
        },
        { $set: { 'details.$[det].info.$[inf].description': updatedValue } },
        {
            arrayFilters: [{ 'det._id': categoryId }, { 'inf._id': infoId }],
        }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.couldNotUpdate(infoId), 404);
    }

    return result;
}

async function editDescription(destinationId, description, infoId) {
    const result = await Destination.updateOne(
        { _id: destinationId },
        { $set: { description: description } }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.couldNotUpdate(infoId), 404);
    }

    return result;
}

module.exports = editDestinationField;
