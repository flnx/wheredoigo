function isObject(value) {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

function isString(str) {
    return typeof str === 'string';
}

function isValidInteger(value) {
    return typeof value === 'number' && Number.isInteger(value);
}

function isValidArrayOfStrings(arr) {
    if (!Array.isArray(arr)) {
        return false;
    }

    if (arr.length === 0) {
        return false; // Return false if the array is empty
    }

    const hasInvalidCategory = arr.some((c) => typeof c !== 'string');

    if (hasInvalidCategory) {
        return false;
    }

    return true;
}

module.exports = {
    isObject,
    isString,
    isValidInteger,
    isValidArrayOfStrings,
};
