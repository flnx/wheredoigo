import { isObject, isValidArrayOfStrings } from './utils';

export const validateFieldsOnEdit = (data, allowedPlaceCategories) => {
    if (!isObject(data)) {
        throw new Error('Only objects are allowed here, buddy 🦖');
    }

    const { description, infoId, categoryId } = data;

    if (!isString(description) || !isString(infoId) || (categoryId && !isString(categoryId))) {
        throw new Error('Data values must be valid strings 🦖');
    }

    if (infoId == 'type') {
        if (!isValidArrayOfStrings(allowedPlaceCategories)) {
            throw new Error('Categories must be an array of strings 🦖');
        }

        if (!allowedPlaceCategories.includes(description)) {
            throw new Error('This category is not allowed 🚫');
        }
    } else {
        if (description.length < 10 || description.length > 5000) {
            throw new Error('Description must be between 10 and 5000 characters 🦖');
        }
    }

    return data;

    function isString(str) {
        return typeof str === 'string' && str.trim().length > 0;
    }
};