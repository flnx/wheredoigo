import { X } from '@phosphor-icons/react';
import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';

import styles from './ImageThumbnailsPreview.module.css';

export const ImageThumbnailsPreview = ({ images = [], handleDeleteImage, isLoading }) => {
    return (
        <div className={`${styles.imagesWrapper}`}>
            {images.map((img, i) => (
                <div
                    key={i}
                    className={styles.thumbnail}
                    onClick={() => handleDeleteImage(i)} // doesn't trigger click during loading
                >
                    <div className={styles.overlayText}>tap to remove</div>
                    <div className={styles.imageContainer}>
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <img src={extractUrl(img)} alt={`image preview ${i}`} />
                        )}
                    </div>
                    {!isLoading && <X size={50} weight="thin" className={styles.remove} />}
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
