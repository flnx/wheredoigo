import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { useKeyboardNavigation } from '../../../hooks/useKeyboardNavigation';

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
}


export const GalleryContextProvider = ({ children, images, closeGalleryHandler, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCurrentImageIndex = (i) => setCurrentIndex(i);

    const onLeftArrowClickHandler = () => {
        const previousImage = images[currentIndex - 1];

        if (previousImage) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const onRightArrowClickHandler = () => {
        const nextImage = images[currentIndex + 1];

        if (nextImage) {
            setCurrentIndex(currentIndex + 1);
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
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            {children}
        </GalleryContext.Provider>
    );
};

GalleryContextProvider.propTypes = propTypes;