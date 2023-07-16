const validator = require('validator');

// Utils
const { isString } = require('../utils');
const { createValidationError } = require('../createValidationError');
const {
    validateDescription,
    validateCategories,
    validateDestinationDetails,
} = require('../validateFields');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

function validateCreatedDestination(data) {
    const { city, country, description, category, details } = data;

    // City validation
    if (!isString(city)) {
        throw createValidationError(errorMessages.form.string('City'), 400);
    }

    if (!validator.isLength(city.trim(), { min: 1, max: 85 })) {
        throw createValidationError(errorMessages.data.city, 400);
    }

    // Country validation
    if (!isString(country)) {
        throw createValidationError(errorMessages.form.string('Country'), 400);
    }

    if (!validator.isLength(country.trim(), { min: 4, max: 56 })) {
        throw createValidationError(errorMessages.data.country, 400);
    }

    // Description validation
    validateDescription(description);

    const validatedCategories = validateCategories(category);

    if (validatedCategories.length == 0) {
        throw createValidationError(errorMessages.data.category, 400);
    }

    // Details validation
    validateDestinationDetails(details);

    return validatedCategories;
}

module.exports = {
    validateCreatedDestination,
};
