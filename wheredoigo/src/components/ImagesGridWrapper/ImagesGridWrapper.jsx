import styles from './ImagesGridWrapper.module.css';

export const ImagesGridWrapper = ({ imageUrl, alt }) => {
    return (
        <div className={styles.imagesWrapper}>
            <img src={imageUrl} alt={alt} />
            <div className={styles.secondaryImages}>
                <img src={imageUrl} alt={alt} />
                <img src={imageUrl} alt={alt} />
                <img src={imageUrl} alt={alt} />
                <img src={imageUrl} alt={alt} />
            </div>
        </div>
    );
};