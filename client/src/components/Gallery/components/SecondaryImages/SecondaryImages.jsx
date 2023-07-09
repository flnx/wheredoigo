import { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { useGalleryAutomaticScroll } from '../../../../hooks/useGalleryAutomaticScroll';

import styles from './SecondaryImages.module.css';

export const SecondaryImages = () => {
    const { 
        images, 
        currentIndex, 
        handleCurrentImageIndex, 
        alt, 
        secImgsRef,
        screenWidth
    } = useContext(GalleryContext);

    const mainImage = images[currentIndex];
    const isActive = styles.isActive;

    const onClickHandler = (e, index) => {
        useGalleryAutomaticScroll(e, secImgsRef, screenWidth);
        handleCurrentImageIndex(index);
    };

    return (
        <div className={styles.secondaryImgContainer} ref={secImgsRef}>
            {images.map((x, i) => (
                <img
                    className={`${mainImage == x && isActive}`} // Adds border to the clicked image
                    src={x.imageUrl}
                    alt={`${alt || 'image'} ${i + 1}`} // Include the index to differentiate alt text
                    key={x._id}
                    onClick={(e) => onClickHandler(e, i)}
                />
            ))}
        </div>
    );
};