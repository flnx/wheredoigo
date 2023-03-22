import styles from './ImagesGridWrapper.module.css';

export const ImagesGridWrapper = ({ images, alt, onClickHandler }) => {
    const mainImageUrl = images[0];
    const secondaryImages = images.slice(1);

    return (
        <div className={styles.imagesWrapper}>
            <div className={styles.mainImgContainer}>
                <img
                    className={styles.mainImg}
                    src={mainImageUrl}
                    alt={alt}
                    onClick={() => onClickHandler(mainImageUrl)}
                />
            </div>
            <div className={styles.secondaryImages}>
                {secondaryImages.map((imgUrl) => (
                    <img
                        src={imgUrl}
                        alt={alt}
                        onClick={() => onClickHandler(imgUrl)}
                        key={imgUrl}
                    />
                ))}
            </div>
        </div>
    );
};
