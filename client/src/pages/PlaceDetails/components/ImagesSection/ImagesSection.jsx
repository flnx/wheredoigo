import { useState } from 'react';
import { createPortal } from 'react-dom';

// Components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';

export const Images = ({ imageUrls, isLoading, city }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = imageUrls.filter(
            (x) => x._id !== clickedImage._id
        );

        // adding the clicked img at index 0 because gallery showcases the first element inside the array
        setGallery([clickedImage, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        // gallery will be closed when the array is empty
        setGallery([]);
    };


    const isGalleryOpen = gallery.length > 0;

    return (
        <section>
            {isGalleryOpen &&
                createPortal(
                    <Gallery
                        closeGalleryHandler={closeGalleryHandler}
                        images={gallery}
                        alt={city}
                    />,
                    document.body
                )}

            <ImagesGridWrapper
                onClickHandler={onImageClickHandler}
                images={imageUrls}
                isLoading={isLoading}
                alt={city}
            />
        </section>
    );
};
