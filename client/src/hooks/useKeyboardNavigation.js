import { useEffect } from 'react';

export const useKeyboardNavigation = (
    closeGalleryHandler,
    onLeftArrowClickHandler,
    onRightArrowClickHandler,
    currentIndex
) => {
    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.code === 'Escape') {
                closeGalleryHandler();
            } else if (e.code === 'ArrowLeft') {
                onLeftArrowClickHandler();
            } else if (e.code === 'ArrowRight') {
                onRightArrowClickHandler();
            }
        };

        document.addEventListener('keydown', detectKeyDown);
        return () => document.removeEventListener('keydown', detectKeyDown);
    }, [currentIndex]);
};
