import { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';

import styles from './SecondaryImages.module.css';

export const SecondaryImages = () => {
    const {
        images,
        currentIndex,
        handleCurrentImageIndex,
        alt
    } = useContext(GalleryContext);

    const mainImage = images[currentIndex];
    const isActive = styles.isActive;

    return (
        <div className={styles.secondaryImgContainer}>
            {images.map((x, i) => (
                <img
                    className={`${mainImage == x && isActive}`} // Adds border to the clicked image
                    src={x.imageUrl}
                    alt={`${alt || 'image'} ${i + 1}`} // Include the index to differentiate alt text
                    key={x._id}
                    onClick={() => handleCurrentImageIndex(i)}
                />
            ))}
        </div>
    );
};
