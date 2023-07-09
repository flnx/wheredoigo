export const useGalleryAutomaticScroll = (e, secondaryImagesRef) => {
    const image = e.target;
    const secondaryImagesElement = secondaryImagesRef.current;

    // Rect
    const imgRect = image.getBoundingClientRect();
    const secImgsRect = secondaryImagesElement.getBoundingClientRect();

    // Scroll offset threshold value
    const scrollOffset = imgRect.height * 0.7;

    // Check if the image is at the end or top of the secondary images container
    const isNearEnd = imgRect.bottom >= secImgsRect.bottom - scrollOffset;
    const isNearTop = imgRect.top <= secImgsRect.top + scrollOffset;

    // imgRect.right >= secImgsRect.right - threshold ||

    if (isNearTop) {
        secondaryImagesElement.scroll({
            top: secondaryImagesElement.scrollTop - imgRect.height,
            behavior: 'smooth',
        });
    }

    if (isNearEnd) {
        secondaryImagesElement.scroll({
            top: secondaryImagesElement.scrollTop + imgRect.height,
            behavior: 'smooth',
        });
    }
};
