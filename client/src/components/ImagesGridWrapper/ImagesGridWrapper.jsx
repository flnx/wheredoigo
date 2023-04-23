import styles from './ImagesGridWrapper.module.css';

export const ImagesGridWrapper = ({ images = [], alt, onClickHandler }) => {
    if (!Array.isArray(images) || images.length == 0) {
        return;
    }

    const mainImage = images[0];
    const secondaryImages = images.slice(1);

    return (
        <div className={styles.imagesWrapper}>
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
        </div>
    );
};
