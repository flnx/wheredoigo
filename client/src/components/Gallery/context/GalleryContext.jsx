import PropTypes from 'prop-types';
import { createContext, useRef, useState } from 'react';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';
import { useGalleryAutomaticScroll } from '../../../hooks/useGalleryAutomaticScroll';
import { useWindowSize } from '../../../hooks/useWindowSize';

export const GalleryContext = createContext();

const propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    closeGalleryHandler: PropTypes.func.isRequired,
    alt: PropTypes.string.isRequired,
};

export const GalleryContextProvider = ({ children, images, closeGalleryHandler, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const secImgsRef = useRef(null);
    const screenWidth = useWindowSize();

    const handleCurrentImageIndex = (i) => setCurrentIndex(i);

    const onLeftArrowClickHandler = () => {
        const previousImage = images[currentIndex - 1];

        if (previousImage) {
            setCurrentIndex(currentIndex - 1);

            const currentImage = secImgsRef.current.children[currentIndex];
            useGalleryAutomaticScroll({ target: currentImage }, secImgsRef, screenWidth);
        }
    };

    const onRightArrowClickHandler = () => {
        const nextImage = images[currentIndex + 1];

        if (nextImage) {
            setCurrentIndex(currentIndex + 1);

            const currentImage = secImgsRef.current.children[currentIndex];
            useGalleryAutomaticScroll({ target: currentImage }, secImgsRef, screenWidth);
        }
    };

    useKeyboardNavigation(
        closeGalleryHandler,
        onLeftArrowClickHandler,
        onRightArrowClickHandler,
        currentIndex
    );

    const contextValue = {
        images,
        alt,
        currentIndex,
        handleCurrentImageIndex,
        onLeftArrowClickHandler,
        onRightArrowClickHandler,
        secImgsRef,
        screenWidth
    };

    return (
        <GalleryContext.Provider value={contextValue}>
            {children}
        </GalleryContext.Provider>
    );
};

GalleryContextProvider.propTypes = propTypes;
