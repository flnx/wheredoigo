import PropTypes from 'prop-types';

// Components
import { X } from '@phosphor-icons/react';
import { LoadingSkeleton } from '../LoadingSkeletons/LoadingSkeleton';
import { applyCloudinaryTransformation } from '../../utils/utils';

import styles from './ImageThumbnailsPreview.module.css';

const propTypes = {
    images: PropTypes.array.isRequired,
    handleDeleteImage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    alt: PropTypes.string,
};

export const ImageThumbnailsPreview = ({ images, handleDeleteImage, isLoading, alt }) => {
    return (
        <div className={`${styles.imagesWrapper}`}>
            {images.map((img, i) => (
                <div
                    key={i}
                    className={styles.thumbnail}
                    onClick={(e) => handleDeleteImage(e, i)} // doesn't trigger click during loading
                >
                    <div className={styles.overlayText}>tap to remove</div>
                    <div className={styles.imageContainer}>
                        {isLoading ? (
                            <LoadingSkeleton />
                        ) : (
                            <img
                                src={applyCloudinaryTransformation(extractUrl(img))}
                                alt={alt ? `${alt} ${i}` : `image preview ${i}`}
                            />
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

ImageThumbnailsPreview.propTypes = propTypes;
