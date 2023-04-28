import { isObject, isValidArrayOfStrings } from './utils';

export const validateFieldsOnEdit = (data, allowedFieldsToUpdate) => {
    if (!isObject(data)) {
        throw new Error('Only objects are allowed here, buddy 🦖');
    }

    const { description, infoId, categoryId } = data;

    if (typeof description !== 'string') {
        throw new Error('Description must be a valid string 🦖');
    }

    if (typeof infoId !== 'string') {
        throw new Error('infoId must be a valid string 🦖');
    }

    if (categoryId && typeof categoryId !== 'string') {
        throw new Error('categoryId must be a valid string 🦖');
    }

    if (infoId == 'type') {
        if (!isValidArrayOfStrings(allowedFieldsToUpdate)) {
            throw new Error('Categories must be an array of strings 🦖');
        }

        if (!allowedFieldsToUpdate.includes(description)) {
            throw new Error('This category is not allowed 🚫');
        }
    } else {
        if (description.length < 10 || description.length > 5000) {
            throw new Error('Description must be between 10 and 5000 characters 🦖');
        }
    }

    return data;
};
