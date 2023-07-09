export const useGalleryAutomaticScroll = (e, secondaryImagesRef, screenWidth) => {
    const image = e.target;

    if (screenWidth < 1296) {
        image.scrollIntoView({
            inline: 'center',
            block: 'end',
            behavior: 'smooth',
        });
    } else {
        const secImgsElem = secondaryImagesRef.current;

        // Rect
        const imgRect = image.getBoundingClientRect();
        const secImgsRect = secImgsElem.getBoundingClientRect();

        // Scroll offset value
        const offset = screenWidth >= 1296 && imgRect.height * 0.7;

        const isNearEnd = screenWidth >= 1296 && imgRect.bottom >= secImgsRect.bottom - offset;

        const isNearTop = screenWidth >= 1296 && imgRect.top <= secImgsRect.top + offset;

        if (isNearTop) {
            image.scrollIntoView({
                inline: 'start',
                block: 'center',
                behavior: 'smooth',
            });
        }

        if (isNearEnd) {
            image.scrollIntoView({
                inline: 'start',
                block: 'center',
                behavior: 'smooth',
            });
        }
    }
};
