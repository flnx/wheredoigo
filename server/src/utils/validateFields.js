const validator = require('validator');

const { allowedPlaceCategories } = require('../constants/allowedPlaceCategories');
const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('./createValidationError');
const { isString, isObject, isValidInteger } = require('./utils');
const { destinationCategories } = require('../constants/allowedDestinationCategories');

function validateDestinationFields(data) {
    const { city, description, category, details } = data;
    const options = { min: 50, max: 5000 };

    if (!Array.isArray(details)) {
        throw createValidationError(errorMessages.destinationDetails, 400);
    }

    if (!isString(city)) {
        throw createValidationError(errorMessages.cityRequired, 400);
    }

    if (!isString(description) || !validator.isLength(description.trim(), options)) {
        throw createValidationError(errorMessages.description, 400);
    }

    if (!isString(category) || !destinationCategories.includes(category)) {
        throw createValidationError(errorMessages.missingFields, 400);
    }

    return true;
}

function validatePlaceFields(placeData) {
    const { description, type, name } = placeData;
    const options = { min: 50, max: 5000 };

    if (!isString(name)) {
        throw createValidationError(errorMessages.placeName, 400);
    }
    
    if (!isString(description) || !validator.isLength(description, options)) {
        throw createValidationError(errorMessages.description, 400);
    }

    if (!isString(placeData.type) || !allowedPlaceCategories.includes(type)) {
        throw createValidationError(errorMessages.invalidCategory, 400);
    }

    return true;
}

function validateImages(images, minimumNum) {
    if (!Array.isArray(images)) {
        throw createValidationError(errorMessages.invalidImages, 400);
    }

    const filteredArray = images.filter((obj) => {
        const isValidObject = isObject(obj);
        const hasBufferAndMimetype = isValidObject && Object.hasOwn(obj, 'buffer') && Object.hasOwn(obj, 'mimetype');

        const isBuffer = isValidObject && Buffer.isBuffer(obj.buffer);
        return isValidObject && hasBufferAndMimetype && isBuffer;
    });

    const minNum = isValidInteger(minimumNum) ? minimumNum : 1;

    if (filteredArray.length < minNum) {
        throw createValidationError(errorMessages.imagesBoundary, 400);
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
    validateDestinationFields,
    validateFieldsOnEdit,
    validateCategories,
    validateImages,
    validatePlaceFields,
};
