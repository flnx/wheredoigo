import { useState } from 'react';
import { createPortal } from 'react-dom';

// components
import { Gallery } from '../../../../components/Gallery/Gallery';
import { ImagesGridWrapper } from '../../../../components/ImagesGridWrapper/ImagesGridWrapper';
import { StarRating } from '../../../../components/StarRating/StarRating';

import styles from './Header.module.css';

export const DestinationHeader = ({ destination }) => {
    const [gallery, setGallery] = useState([]);

    const images = {
        img1: destination.imageUrl.url,
        img2: destination.imageUrl2.url,
        img3: destination.imageUrl3.url,
        img4: destination.imageUrl4.url,
        img5: destination.imageUrl5.url,
    };

    const onImageClickHandler = (clickedImage) => {
        const arrayWithoutClickedImage = Object
            .values(images)
            .filter((x) => x !== clickedImage);

        // adding clicked img on index 0
        setGallery([clickedImage, ...arrayWithoutClickedImage]);
    };

    const closeGalleryHandler = () => {
        setGallery([]);
    };

    const isGalleryOpen = gallery.length > 0;

    return (
        <header className={styles.intro}>
            {isGalleryOpen && createPortal(
                    <Gallery
                        images={gallery}
                        closeGalleryHandler={closeGalleryHandler}
                    />,
                    document.body
                )}
            <ImagesGridWrapper
                images={images}
                alt={destination.city}
                onClickHandler={onImageClickHandler}
            />
            <div className={styles.titleWrapper}>
                <h1>{destination.city}</h1>
                <StarRating rating={5} />
            </div>
            <div className={styles.headerContent}>
                <p className={styles.countryName}>{destination.country}</p>
                <h3 className={styles.descriptionTitle}>Overview</h3>
                <p className={styles.description}>{destination.description}</p>
            </div>
        </header>
    );
};
