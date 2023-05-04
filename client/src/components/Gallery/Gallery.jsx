import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { X } from '@phosphor-icons/react';
import { CaretLeft } from '@phosphor-icons/react';
import { CaretRight } from '@phosphor-icons/react';

import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler }) => {
    const [mainImage, setMainImage] = useState(images[0]);
    const mainImgIndex = images.findIndex((i) => i._id == mainImage._id);

    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

    const onLeftArrowClickHandler = () => {
        const previousImage = images[mainImgIndex - 1];

        if (previousImage) {
            setMainImage(previousImage);
        }
    };

    const onRightArrowClickHandler = () => {
        const nextImage = images[mainImgIndex + 1];

        if (nextImage) {
            setMainImage(nextImage);
        }
    };

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    const isActive = styles.isActive;
    const isFirstImage = mainImgIndex == 0;
    const isLastImage = mainImgIndex == images.length - 1;

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
                        {images.map((x) => (
                            <img
                                className={`${mainImage == x && isActive}`}
                                src={x.imageUrl}
                                alt="img"
                                key={x._id}
                                onClick={() => setMainImage(x)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
