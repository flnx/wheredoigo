export const disableBodyScroll = () => {
    return (document.body.style.overflow = 'hidden');
};
export const enableBodyScroll = () => {
    return (document.body.style.overflow = '');
};

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
