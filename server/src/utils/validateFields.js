const validator = require('validator');

// Constants
const { errorMessages } = require('../constants/errorMessages');
const { allowedPlaceCategories, allowedFieldsToUpdate } = require('../constants/allowedPlaceCategories');
const { destinationCategories } = require('../constants/allowedDestinationCategories');

// Utils
const { createValidationError } = require('./createValidationError');
const { isString, isValidArrayOfStrings} = require('./utils');
const { validateDescription } = require('./validators/validateDescription');

function validatePlaceFields(placeData) {
    const { description, type, name } = placeData;

    validatePlaceName(name);
    validateDescription(description);
    validatePlaceType(type);

    return true;
}

function validatePlaceFieldOnEdit(data) {
    const { description, infoId } = data;

    if (!isString(description)) {
        throw createValidationError(errorMessages.form.string('Description'), 400);
    }

    if (!isString(infoId)) {
        throw createValidationError(errorMessages.form.string('infoId'), 400);
    }

    if (!allowedFieldsToUpdate.includes(infoId.toLowerCase())) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    if (infoId.toLowerCase() == 'description') {
        data.description = validateDescription(description);
    }

    if (infoId.toLowerCase() == 'type') {
        validatePlaceType(description);
    }

    if (infoId == 'name') {
        validatePlaceName(description);
    }

    return data;
}

function validatePlaceType(type) {
    if (!isString(type)) {
        throw createValidationError(errorMessages.form.string('Place type'), 400);
    }

    if (!allowedPlaceCategories.includes(type)) {
        throw createValidationError(errorMessages.data.category, 400);
    }

    return true;
}

function validatePlaceName(name) {
    if (!isString(name)) {
        throw createValidationError(errorMessages.form.string('Place name'), 400);
    }

    if (!validator.isLength(name.trim(), { min: 1, max: 60 })) {
        throw createValidationError(errorMessages.validation.placeName, 400);
    }

    return true;
}

function validateCategories(categories) {
    if (categories && isValidArrayOfStrings(categories)) {
        const filteredCategories = categories
            .filter((c) => destinationCategories.includes(c))
            .filter((value, index, self) => self.indexOf(value) === index); // Filter out repeating values

        return filteredCategories;
    }

    return [];
}

module.exports = {
    validateCategories,
    validatePlaceFields,
    validatePlaceFieldOnEdit,
};
