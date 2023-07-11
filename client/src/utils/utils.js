export const disableBodyScroll = () => {
    return (document.body.style.overflow = 'hidden');
};
export const enableBodyScroll = () => {
    return (document.body.style.overflow = '');
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const isObject = (value) => {
    return typeof value === 'object' && !Array.isArray(value) && value !== null;
};

export const isValidArrayOfStrings = (arr) => {
    if (!Array.isArray(arr)) {
        return false;
    }

    const hasInvalidCategory = arr.some((c) => typeof c !== 'string');

    if (hasInvalidCategory) {
        return false;
    }

    return true;
};

export function checkArrayAndPreloadElements(arr, prefillNum) {
    if (!Number.isInteger(prefillNum)) {
        prefillNum = 4; // Set default value to 4
    }

    if (Array.isArray(arr) && arr.length > 0) {
        return arr;
    }

    // returns an array of X objects with ids from 0 to X
    return new Array(prefillNum).fill(null).map((_, i) => ({ _id: i }));
}

export function extractServerErrorMessage(error) {
    if (!error) return;

    const { response } = error;

    if (error.message == 'Network Error' || !response) {
        // Check ErrorFallbackComponent before changing this!!!
        return 'Network Error';
    }

    const { status, data } = response;

    let message = '';

    if (data && typeof data.message === 'string') {
        message = data.message;
    }

    switch (status) {
        case 400:
            return message || 'Bad Request';
        case 401:
            return message || 'Unauthorized';
        case 403:
            return message || 'Forbidden';
        case 404:
            return 'Not Found'; // Check ErrorFallbackComponent before changing this!!!
        case 500:
            return message || 'Internal Server Error';
        default:
            return message || 'An error occurred';
    }
}
