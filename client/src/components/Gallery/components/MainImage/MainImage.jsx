import { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';

// Components
import { LeftArrow } from '../Arrows/LeftArrow';
import { RightArrow } from '../Arrows/RightArrow';

import styles from './MainImage.module.css';

export const MainImage = () => {
    const { images, currentIndex, alt } = useContext(GalleryContext);

    const isFirstImage = currentIndex == 0;
    const isLastImage = currentIndex == images.length - 1;
    const mainImage = images[currentIndex];

    return (
        <div className={styles['main-image-container']}>
            {!isFirstImage && <LeftArrow />}
            <img src={mainImage.imageUrl} alt={alt || 'image'} />
            {!isLastImage && <RightArrow />}
        </div>
    );
};