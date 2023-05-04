import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import { X } from '@phosphor-icons/react';
import { CaretLeft } from '@phosphor-icons/react';
import { CaretRight } from '@phosphor-icons/react';

import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

    const onLeftArrowClickHandler = () => {
        const imgIndex = images.findIndex((i) => i._id == mainImage._id);
        const previousImage = images[imgIndex - 1];

        if (previousImage) {
            setMainImage(previousImage);
        }
    };

    const onRightArrowClickHandler = () => {
        const imgIndex = images.findIndex((i) => i._id == mainImage._id);
        const nextImage = images[imgIndex + 1];

        if (nextImage) {
            setMainImage(nextImage);
        }
    };

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    const isActive = styles.isActive;

    return (
        <section>
            <div className={styles.overlay} onClick={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.xIcon} onClick={closeGalleryHandler}>
                    <X size={30} />
                </div>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImgContainer}>
                        <div className={styles.leftArrow}>
                            <CaretLeft size={32} onClick={onLeftArrowClickHandler} />
                        </div>
                        <img src={mainImage.imageUrl} alt="img" className={styles.mainImg} />
                        <div className={styles.rightArrow}>
                            <CaretRight size={32} onClick={onRightArrowClickHandler} />
                        </div>
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
