export const disableBodyScroll = () => {
    return (document.body.style.overflow = 'hidden');
};
export const enableBodyScroll = () => {
    return (document.body.style.overflow = '');
};

export const encodeData = (data) => {
    return encodeURIComponent(JSON.stringify(data));
};