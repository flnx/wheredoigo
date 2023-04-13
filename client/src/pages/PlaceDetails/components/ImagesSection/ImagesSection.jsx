import { useState } from 'react';
import { createPortal } from 'react-dom';

// Components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';

export const Images = ({ place }) => {
    const [gallery, setGallery] = useState([]);

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = place.imageUrls.filter(
            (x) => x._id !== clickedImage._id
        );

        // adding clicked img on index 0 so when the gallery opens to showcase it
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
                        closeGalleryHandler={closeGalleryHandler}
                        images={gallery}
                    />,
                    document.body
                )}

            <ImagesGridWrapper
                onClickHandler={onImageClickHandler}
                images={place.imageUrls}
            />
        </section>
    );
};
