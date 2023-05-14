import PropTypes from 'prop-types';
import { useState } from 'react';

// Components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { createPortal } from 'react-dom';

const propTypes = {
    imageUrls: PropTypes.array.isRequired,
    city: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export const ImagesSection = ({ imageUrls, city, isLoading }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImg) => {
        const arrayWithoutClickedImage = imageUrls.filter((x) => x._id !== clickedImg._id);

        // adding the clicked img on index 0
        setGallery([clickedImg, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <section>
            {isGalleryOpen &&
                !isLoading &&
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
