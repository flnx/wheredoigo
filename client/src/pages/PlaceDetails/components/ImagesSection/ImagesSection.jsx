import { useState } from 'react';
import { createPortal } from 'react-dom';

// Components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';

export const Images = ({ place }) => {
    const [gallery, setGallery] = useState([]);

    const images = {
        img1: place.image.url,
        img2: place.imageUrl2?.url,
        img3: place.imageUrl3?.url,
        img4: place.imageUrl4?.url,
        img5: place.imageUrl5?.url,
    };

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = Object.values(images).filter(
            (x) => x !== clickedImage
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
                        closeGalleryHandler={closeGalleryHandler}
                        images={gallery}
                    />,
                    document.body
                )}

            <ImagesGridWrapper
                onClickHandler={onImageClickHandler}
                images={images}
            />
        </section>
    );
};
