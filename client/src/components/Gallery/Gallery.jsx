import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

// Components
import { X } from '@phosphor-icons/react';
import { SecondaryImages } from './components/SecondaryImages/SecondaryImages';
import { MainImage } from './components/MainImage/MainImage';
import { DarkOverlay } from '../DarkOverlay/DarkOverlay';

import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler, alt }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (images.length == 0) return null;

    const handleCurrentIndex = (i) => setCurrentIndex(i);

    const onLeftArrowClickHandler = () => {
        const previousImage = images[currentIndex - 1];

        if (previousImage) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const onRightArrowClickHandler = () => {
        const nextImage = images[currentIndex + 1];

        if (nextImage) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    useKeyboardNavigation(
        closeGalleryHandler,
        onLeftArrowClickHandler,
        onRightArrowClickHandler,
        currentIndex
    );

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return (
        <section>
            <DarkOverlay onClickHandler={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.xIcon} onClick={closeGalleryHandler} tabIndex={0}>
                    <X size={30} />
                </div>
                <div className={styles.imagesContainer}>
                    <MainImage
                        currentIndex={currentIndex}
                        images={images}
                        onLeftArrowClickHandler={onLeftArrowClickHandler}
                        onRightArrowClickHandler={onRightArrowClickHandler}
                        alt={alt}
                    />
                    <SecondaryImages
                        currentIndex={currentIndex}
                        images={images}
                        onClickHandler={handleCurrentIndex}
                        alt={alt}
                    />
                </div>
            </div>
        </section>
    );
};
