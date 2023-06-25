import { isObject, isValidArrayOfStrings } from './utils';

export const validateFieldsOnEdit = (data, allowedCategories) => {
    if (!isObject(data)) {
        throw new Error('Only objects are allowed here, buddy 🦖');
    }

    const { description, infoId, categoryId, categories } = data;   

    if (!isString(description) || !isString(infoId) || (categoryId && !isString(categoryId))) {
        throw new Error('Data values must be valid strings 🦖');
    }

    
    if (infoId.toLowerCase() == 'Description' && description.length < 50 || description.length > 5000) {
        throw new Error('Description must be between 50 and 5000 characters');
    }

    
    if (categories) {
        if (!isValidArrayOfStrings(allowedCategories) || !isValidArrayOfStrings(categories)) {
            throw new Error('Categories must be an array of strings 🦖');
        }
        
        const trimOutEmptyStrings = categories.filter((str) => str.trim().length > 0);

        if (trimOutEmptyStrings.length == 0) {
            throw new Error('Please select at least 1 category');
        }

        data.categories = trimOutEmptyStrings;
    }

    if (infoId == 'type') {
        if (!isValidArrayOfStrings(allowedCategories)) {
            throw new Error('Categories must be an array of strings 🦖');
        }

        if (!allowedCategories.includes(description)) {
            throw new Error('This category is not allowed 🚫');
        }
    } else {
        if (description.length > 5000) {
            throw new Error("Oops! It seems like you've exceeded the limit of 5000 characters. 🦖");
        }
    }

    return data;

    function isString(str) {
        return typeof str === 'string';
    }
};
