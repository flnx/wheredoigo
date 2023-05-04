import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { X } from '@phosphor-icons/react';
import { CaretLeft } from '@phosphor-icons/react';
import { CaretRight } from '@phosphor-icons/react';

import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

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

    useEffect(() => {
        const detectKeyDown = (e) => {
            if (e.code == 'Escape') {
                closeGalleryHandler();
            } else if (e.code === 'ArrowLeft') {
                onLeftArrowClickHandler();
            } else if (e.code == 'ArrowRight') {
                onRightArrowClickHandler();
            }
        };

        document.addEventListener('keydown', detectKeyDown);
        return () => document.removeEventListener('keydown', detectKeyDown);
    }, [currentIndex]);

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    const mainImage = images[currentIndex];
    const isActive = styles.isActive;
    const isFirstImage = currentIndex == 0;
    const isLastImage = currentIndex == images.length - 1;

    return (
        <section>
            <div className={styles.overlay} onClick={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.xIcon} onClick={closeGalleryHandler}>
                    <X size={30} />
                </div>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImgContainer}>
                        {!isFirstImage && (
                            <div
                                className={styles.leftArrow}
                                onClick={onLeftArrowClickHandler}
                            >
                                <CaretLeft size={32} />
                            </div>
                        )}
                        <img src={mainImage.imageUrl} alt="img" className={styles.mainImg} />
                        {!isLastImage && (
                            <div
                                className={styles.rightArrow}
                                onClick={onRightArrowClickHandler}
                            >
                                <CaretRight size={32} />
                            </div>
                        )}
                    </div>
                    <div className={styles.secondaryImgContainer}>
                        {images.map((x, i) => (
                            <img
                                className={`${mainImage == x && isActive}`}
                                src={x.imageUrl}
                                alt="img"
                                key={x._id}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
