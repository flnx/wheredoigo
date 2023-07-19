const validator = require('validator');

// Constants
const { errorMessages } = require('../constants/errorMessages');

const {
    allowedPlaceCategories,
    allowedFieldsToUpdate,
} = require('../constants/allowedPlaceCategories');

const {
    destinationCategories,
    destinationDetails,
} = require('../constants/allowedDestinationCategories');

// Utils
const { sanitizeHtml } = require('./sanitizeHtml');
const { removeTagsAndGetLength } = require('./removeTagsAndGetLength');
const { createValidationError } = require('./createValidationError');
const { isString, isValidArrayOfStrings, isObject } = require('./utils');

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

function validateDescription(htmlStr, min = 50, max = 5000) {
    if (!isString(htmlStr)) {
        throw createValidationError(errorMessages.form.string('Description'), 400);
    }

    const sanitizedHtmlStr = sanitizeHtml(htmlStr);
    const plainText = removeTagsAndGetLength(sanitizedHtmlStr);

    if (!validator.isLength(plainText.trim(), { min, max })) {
        throw createValidationError(errorMessages.validation.description, 400);
    }

    return sanitizedHtmlStr;
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

    const sanitizedDetails = details.map((detail) => ({
        name: detail.name,
        content: sanitizeHtml(detail.content),
    }));
    
    return sanitizedDetails;
}

module.exports = {
    validateCategories,
    validatePlaceFields,
    validatePlaceFieldOnEdit,
    validateDescription,
    validateDestinationDetails,
};
