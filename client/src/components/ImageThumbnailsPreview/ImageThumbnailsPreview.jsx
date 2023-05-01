import { X } from '@phosphor-icons/react';

import styles from './ImageThumbnailsPreview.module.css';

export const ImageThumbnailsPreview = ({ images = [], handleDeleteImage }) => {
    return (
        <div className={`${styles.imagesWrapper}`}>
            {images.map((img, i) => (
                <div
                    key={i}
                    className={styles.imgContainer}
                    onClick={() => handleDeleteImage(i)}
                >
                    <div className={styles.overlayText}>tap to remove</div>
                    <img src={extractUrl(img)} alt={`image preview ${i}`} />
                    <X size={50} weight="thin" className={styles.remove} />
                </div>
            ))}
        </div>
    );
};

const extractUrl = (img) => {
    if (typeof img === 'string') {
        return img;
    } else if (typeof img === 'object') {
        return img.imageUrl;
    }
};
