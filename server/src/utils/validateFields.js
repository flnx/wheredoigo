const { isValid } = require('mongoose').Types.ObjectId;
const validator = require('validator');
const { createValidationError } = require('./createValidationError');

// Constants
const {
    allowedPlaceCategories,
    allowedFieldsToUpdate,
} = require('../constants/allowedPlaceCategories');
const { errorMessages } = require('../constants/errorMessages');
const {
    destinationCategories,
} = require('../constants/allowedDestinationCategories');

// Utils
const { isString, isObject, isValidArrayOfStrings } = require('./utils');

function validateDestinationFields(data) {
    const { city, country, description, category, details } = data;

    // Details validation
    if (!Array.isArray(details)) {
        throw createValidationError(errorMessages.destinationDetails, 400);
    }

    // City validation
    if (!isString(city)) {
        throw createValidationError(errorMessages.mustBeAString('City'), 400);
    }

    if (!validator.isLength(city.trim(), { min: 1, max: 85 })) {
        throw createValidationError(errorMessages.cityRequired, 400);
    }

    // Country validation
    if (!isString(country)) {
        throw createValidationError(errorMessages.mustBeAString('Country'), 400);
    }

    if (!validator.isLength(country.trim(), { min: 4, max: 56 })) {
        throw createValidationError(errorMessages.countryRequired, 400);
    }

    // Description validation
    validateDescription(description);

    const validatedCategories = validateCategories(category);

    if (validatedCategories.length == 0) {
        throw createValidationError(errorMessages.selectCategory, 400);
    }

    return validatedCategories;
}

function validatePlaceFields(placeData) {
    const { description, type, name } = placeData;

    validatePlaceName(name);
    validateDescription(description);
    validatePlaceType(type);

    return true;
}

function validateDestinationFieldOnEdit(data) {
    if (!isObject(data)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const { description, infoId, categoryId, categories } = data;

    if (!isString(description)) {
        throw createValidationError(errorMessages.mustBeAString('Description'), 400);
    }

    if (!isString(infoId)) {
        throw createValidationError(errorMessages.mustBeAString('infoId'), 400);
    }

    if (infoId.toLowerCase() == 'description') {
        validateDescription(description);
    } else if (categories) {
        const validatedCategories = validateCategories(categories);

        if (validatedCategories.length == 0) {
            throw createValidationError(errorMessages.selectCategory, 400);
        }

        data.categories = validatedCategories;
    } else {
        if (!isString(categoryId) || categoryId.trim().length == 0) {
            throw createValidationError(
                errorMessages.mustBeAString('Category'),
                400
            );
        }

        if (!isValid(infoId) || !isValid(categoryId)) {
            throw createValidationError(errorMessages.invalidCategory, 400);
        }

        if (description.length > 5000) {
            throw createValidationError(errorMessages.validation.description, 400);
        }
    }

    return data;
}

function validatePlaceFieldOnEdit(data) {
    if (!isObject(data)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const { description, infoId } = data;

    if (!isString(description)) {
        throw createValidationError(errorMessages.mustBeAString('Description'), 400);
    }

    if (!isString(infoId)) {
        throw createValidationError(errorMessages.mustBeAString('infoId'), 400);
    }

    if (!allowedFieldsToUpdate.includes(infoId.toLowerCase())) {
        throw createValidationError(errorMessages.permissions, 400);
    }

    if (infoId.toLowerCase() == 'description') {
        validateDescription(description);
    }

    if (infoId.toLowerCase() == 'type') {
        validatePlaceType(description);
    }

    if (infoId == 'name') {
        validatePlaceName(description);
    }

    return data;
}

function validateDescription(description) {
    if (!isString(description)) {
        throw createValidationError(errorMessages.mustBeAString('Description'), 400);
    }

    if (!validator.isLength(description.trim(), { min: 50, max: 5000 })) {
        throw createValidationError(errorMessages.validation.description, 400);
    }

    return true;
}

function validatePlaceType(type) {
    if (!isString(type)) {
        throw createValidationError(errorMessages.mustBeAString('Place type'), 400);
    }

    if (!allowedPlaceCategories.includes(type)) {
        throw createValidationError(errorMessages.invalidCategory, 400);
    }

    return true;
}

function validatePlaceName(name) {
    if (!isString(name)) {
        throw createValidationError(errorMessages.mustBeAString('Place name'), 400);
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
    validateDestinationFields,
    validateDestinationFieldOnEdit,
    validateCategories,
    validatePlaceFields,
    validatePlaceFieldOnEdit,
};
