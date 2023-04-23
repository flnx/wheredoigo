import { useEffect, useState } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import styles from './Gallery.module.css';

export const Gallery = ({ images = [], closeGalleryHandler }) => {
    const [mainImage, setMainImage] = useState(images[0]);

    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    const isActive = styles.isActive;

    return (
        <section>
            <div className={styles.overlay} onClick={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImgContainer}>
                        <img
                            src={mainImage.imageUrl}
                            alt="img"
                            className={styles.mainImg}
                        />
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
