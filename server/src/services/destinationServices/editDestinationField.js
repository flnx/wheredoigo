const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// Utils
const { isValid } = require('mongoose').Types.ObjectId;
const { createValidationError } = require('../../utils/createValidationError');
const { isString } = require('../../utils/utils');
const { validateDescription, validateCategories } = require('../../utils/validateFields');

async function editDestinationField(destinationId, updatedFields) {
    const { description, categories, infoId, categoryId } = updatedFields;

    if (!isString(description)) {
        throw createValidationError(errorMessages.form.string('Description'), 400);
    }

    if (!isString(infoId)) {
        throw createValidationError(errorMessages.form.string('infoId'), 400);
    }

    if (infoId.toLowerCase() == 'description') {
        const result = await editDescription(destinationId, description);
        return result;
    }

    if (categories) {
        const result = await editCategories(destinationId, categories);
        return result;
    }

    const result = await editDetail(destinationId, categoryId, description);
    return result;
}

// --- DESCRIPTION ---
async function editDescription(destinationId, description) {
    const validatedDescription = validateDescription(description);

    const result = await Destination.updateOne(
        { _id: destinationId },
        { $set: { description: validatedDescription } }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }

    return result;
}

// --- CATEGORIES ---
async function editCategories(destinationId, categories) {
    const validatedCategories = validateCategories(categories);

    if (validatedCategories.length == 0) {
        throw createValidationError(errorMessages.data.category, 400);
    }

    const result = await Destination.updateOne(
        { _id: destinationId },
        { $set: { category: categories } }
    )
        .lean()
        .exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }

    return result;
}

// --- DETAILS ---
async function editDetail(destinationId, detail_id, editedContent) {
    if (!isString(detail_id) || !isValid(detail_id)) {
        throw createValidationError('Invalid Detail ID', 400);
    }

    const validatedContent = validateDescription(editedContent, 0);

    const result = await Destination.updateOne(
        { _id: destinationId, 'details._id': detail_id },
        { $set: { 'details.$.content': validatedContent } }
    ).exec();

    if (!result || result.matchedCount === 0) {
        throw createValidationError(errorMessages.data.notEdited, 404);
    }

    return result;
}

module.exports = editDestinationField;
