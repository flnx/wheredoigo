import styles from './ImagesGridWrapper.module.css';

import { Image } from '@phosphor-icons/react';

export const ImagesGridWrapper = ({ images = [], alt, onClickHandler }) => {
    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

    const mainImage = images[0];
    const secondaryImages = images.slice(1);

    return (
        <div className={styles['images']}>
            <div className={styles.mainImgContainer}>
                <img
                    className={styles.mainImg}
                    src={mainImage.imageUrl}
                    alt={alt}
                    onClick={() => onClickHandler(mainImage)}
                />
            </div>
            <div className={styles.secondaryImages}>
                {secondaryImages.slice(0, 4).map((x) => (
                    <img
                        src={x.imageUrl}
                        alt={alt}
                        onClick={() => onClickHandler(x)}
                        key={x._id}
                    />
                ))}
            </div>
            <div className={styles['show-all-btn']}>
                <button className={styles.btn}>
                    <span className={styles.imgIcon}>
                        <Image size={20} />
                    </span>
                    <span>Show all images</span>
                </button>
            </div>
        </div>
    );
};
