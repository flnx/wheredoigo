import styles from './ImagesGridWrapper.module.css';

export const ImagesGridWrapper = ({ images, alt, onClickHandler }) => {
    return (
        <div className={styles.imagesWrapper}>
            <div className={styles.mainImgContainer}>
                <img
                    className={styles.mainImg}
                    src={images?.img1}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img1)}
                />
            </div>
            <div className={styles.secondaryImages}>
                <img
                    src={images?.img2}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img2)}
                />
                <img
                    src={images?.img3}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img3)}
                />
                <img
                    src={images?.img4}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img4)}
                />
                <img
                    src={images?.img5}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img5)}
                />
            </div>
        </div>
    );
};
