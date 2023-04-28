const validator = require('validator');

const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');
const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');

function validateFields(placeData) {
    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw createValidationError(errorMessages.missingFields, 400);
    }
}

function validateFieldsOnEdit(data) {
    const { description, infoId, categoryId } = data;

    if (typeof description !== 'string') {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    if (typeof infoId !== 'string') {
        throw createValidationError(errorMessages.invalidBody, 400);
    }
    
    if (categoryId && typeof categoryId !== 'string') {
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

module.exports = {
    validateFields,
    validateFieldsOnEdit,
};
