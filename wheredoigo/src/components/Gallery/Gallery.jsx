import { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from '../../utils/utils';
import styles from './Gallery.module.css';

export const Gallery = ({ images, closeGalleryHandler }) => {
    useEffect(() => {
        disableBodyScroll();
        return () => enableBodyScroll();
    }, []);

    return (
        <section>
            <div className={styles.overlay} onClick={closeGalleryHandler} />
            <div className={styles.wrapper}>
                <div className={styles.imagesContainer}>
                    <div className={styles.mainImgContainer}>
                        <img
                            src={images[0]}
                            alt="img"
                            className={styles.mainImg}
                        />
                    </div>
                    <div className={styles.secondaryImgContainer}>
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                        <img src={images[0]} alt="img" />
                    </div>
                </div>
                {/* {images.map((img) => (
                    <img src={img} alt="image " />
                ))} */}
            </div>
        </section>
    );
};
