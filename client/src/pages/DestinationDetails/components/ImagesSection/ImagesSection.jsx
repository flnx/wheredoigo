import PropTypes from 'prop-types';
import { useState } from 'react';

// Components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { createPortal } from 'react-dom';

const propTypes = {
    imageUrls: PropTypes.array.isRequired,
    city: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

export const ImagesSection = ({ imageUrls, city, isLoading }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImg) => {
        const arrayWithoutClickedImage = imageUrls.filter((x) => x._id !== clickedImg._id);

        // adding the clicked img at index 0 because gallery showcases the first element inside the array
        setGallery([clickedImg, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        // gallery will be closed when the array is empty
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0 && !isLoading;

    return (
        <section>
            {isGalleryOpen &&
                createPortal(
                    <Gallery
                        images={gallery}
                        closeGalleryHandler={closeGalleryHandler}
                        alt={city}
                    />,
                    document.body
                )}
            <ImagesGridWrapper
                images={imageUrls}
                alt={city}
                onClickHandler={onImageClickHandler}
                isLoading={isLoading}
            />
        </section>
    );
};

ImagesSection.propTypes = propTypes;
