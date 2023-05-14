import styles from './SecondaryImages.module.css';

export const SecondaryImages = ({ images, onClickHandler, alt, currentIndex }) => {
    const mainImage = images[currentIndex];
    const isActive = styles.isActive;

    return (
        <div className={styles.secondaryImgContainer}>
            {images.map((x, i) => (
                <img
                    className={`${mainImage == x && isActive}`}
                    src={x.imageUrl}
                    alt={alt || 'image'}
                    key={x._id}
                    onClick={() => onClickHandler(i)}
                />
            ))}
        </div>
    );
};
