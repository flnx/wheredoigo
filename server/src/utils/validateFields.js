const validator = require('validator');

const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');
const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');
const { isString } = require('./utils');
const {
    destinationCategories,
} = require('../constants/allowedDestinationCategories');

function validateFields(placeData) {
    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw createValidationError(errorMessages.missingFields, 400);
    }

    if (placeData.city && !isString(placeData.city)) {
        throw createValidationError(errorMessages.missingFields, 400);
    }

    if (placeData.description && !isString(placeData.description)) {
        throw createValidationError(errorMessages.missingFields, 400);
    }

    if (placeData.category && !isString(placeData.category)) {
        throw createValidationError(errorMessages.missingFields, 400);
    }

    return true;
}

function validateFieldsOnEdit(data) {
    const { description, infoId, categoryId } = data;

    if (!isString(description) || !isString(infoId)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    if (categoryId && !isString(categoryId)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    if (infoId == 'type') {
        if (!allowedPlaceCategories.includes(description)) {
            throw createValidationError(errorMessages.invalidCategory, 400);
        }
    } else {
        if (!validator.isLength(description, { min: 10, max: 5000 })) {
            throw createValidationError(errorMessages.description, 400);
        }
    }

    return data;
}

function validateCategories(categories) {
    if (categories && Array.isArray(categories)) {
        const filteredCategories = categories
            .filter((c) => isString(c) && destinationCategories.includes(c))
            .filter((value, index, self) => self.indexOf(value) === index); // Filter out repeating values

        return filteredCategories;
    }

    return [];
}

module.exports = {
    validateFields,
    validateFieldsOnEdit,
    validateCategories,
};
