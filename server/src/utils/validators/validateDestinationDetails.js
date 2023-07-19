// Constants
const { errorMessages } = require('../../constants/errorMessages');
const { destinationDetails } = require('../../constants/allowedDestinationCategories');

// Utils
const { createValidationError } = require('../createValidationError');
const { isString, isObject } = require('../utils');
const { validateDescription } = require('./validateDescription');

function validateDestinationDetails(details) {
    // Details array validation

    if (!Array.isArray(details)) {
        throw createValidationError(errorMessages.form.array('details'), 400);
    }

    // Array size validation
    if (details.length !== destinationDetails.length) {
        throw createValidationError(errorMessages.data.details, 400);
    }

    // Non object inside details found
    const invalidIndex = details.findIndex((detail) => !isObject(detail));

    if (invalidIndex !== -1) {
        throw createValidationError(
            errorMessages.form.object(`Inside details.[${invalidIndex}]`),
            400
        );
    }

    // Detail name or content is not a string
    const invalidTypeInsideDetailIndex = details.findIndex(
        (detail) => !isString(detail.name) || !isString(detail.content)
    );

    if (invalidTypeInsideDetailIndex !== -1) {
        throw createValidationError(
            errorMessages.form.string(
                `An object inside details has a non string field - [${invalidTypeInsideDetailIndex}]`
            ),
            400
        );
    }

    // Invalid detail found
    const invalidDetail = details.some(
        (detail) => !destinationDetails.includes(detail.name)
    );

    if (invalidDetail) {
        throw createValidationError(errorMessages.data.details, 400);
    }

    // Details sanitization and length check
    const sanitizedDetails = details.map((detail) => ({
        name: detail.name,
        content: validateDescription(detail.content, 0, 2000),
    }));

    return sanitizedDetails;
}

module.exports = {
    validateDestinationDetails,
};
