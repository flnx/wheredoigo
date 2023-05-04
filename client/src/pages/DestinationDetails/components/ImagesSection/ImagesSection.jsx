import { useState } from 'react';
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { createPortal } from 'react-dom';

export const ImagesSection = ({ imageUrls, city }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImg) => {
        const arrayWithoutClickedImage = imageUrls.filter((x) => x._id !== clickedImg._id);

        // adding clicked img on index 0
        setGallery([clickedImg, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <section>
            {isGalleryOpen &&
                createPortal(
                    <Gallery images={gallery} closeGalleryHandler={closeGalleryHandler} />,
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
