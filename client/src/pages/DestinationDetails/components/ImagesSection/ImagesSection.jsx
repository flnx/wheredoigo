import { useState } from 'react';
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { createPortal } from 'react-dom';

export const ImagesSection = ({ imageUrls, city }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = destination.imageUrls.filter(
            (x) => x._id !== clickedImage._id
        );

        // adding clicked img on index 0
        setGallery([clickedImage, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <section>
            {isGalleryOpen &&
                createPortal(
                    <Gallery 
                        images={gallery} 
                        closeGalleryHandler={closeGalleryHandler} 
                    />,
                    document.body
                )}
            <ImagesGridWrapper
                images={imageUrls}
                alt={city}
                onClickHandler={onImageClickHandler}
            />
        </section>
    );
};
