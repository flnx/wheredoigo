import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useState } from 'react';

// Components
import { Gallery } from 'src/components/Gallery/Gallery';
import { ImagesGridWrapper } from 'src/components/ImagesGridWrapper/ImagesGridWrapper';

const propTypes = {
    imageUrls: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        })
    ).isRequired,
    city: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
};

export const ImagesSection = ({ imageUrls, city, isLoading }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImg) => {
        // filters out the clicked image
        const arrayWithoutClickedImage = imageUrls.filter((x) => x._id !== clickedImg._id);

        // adding the clicked image at index 0..
        //..because the gallery sets as "main image" the first element in the array
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
