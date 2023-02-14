import styles from './ImagesGridWrapper.module.css';

export const ImagesGridWrapper = ({ images, alt, onClickHandler }) => {
    const mainImageUrl = images?.img1;

    const secondaryImages = Object
        .values(images)
        .filter((imgUrl) => imgUrl != mainImageUrl)
        .map((imgUrl, index) => imgUrl == undefined ? index : imgUrl);


    return (
        <div className={styles.imagesWrapper}>
            <div className={styles.mainImgContainer}>
                <img
                    className={styles.mainImg}
                    src={mainImageUrl}
                    alt={alt}
                    onClick={() => onClickHandler(images?.img1)}
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
