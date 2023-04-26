export const disableBodyScroll = () => {
    return (document.body.style.overflow = 'hidden');
};
export const enableBodyScroll = () => {
    return (document.body.style.overflow = '');
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export function extractServerErrorMessage(error) {
    const { response } = error;

    if (!response) {
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
            return message || 'Not Found';
        case 500:
            return message || 'Internal Server Error';
        default:
            return message || 'An error occurred';
    }
}
