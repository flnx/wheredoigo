import { X } from 'phosphor-react';

import styles from './ImagesPreviewer.module.css';

export const ImagesPreviewer = ({ images = [], handleDeleteImage }) => {
    return (
        <div className={styles.imagesWrapper}>
            {images.map((img, i) => (
                <div key={i} className={styles.imgContainer} onClick={() => handleDeleteImage(i)}>
                    <img src={extractUrl(img)} alt={`image preview ${i}`} />
                    <X size={40} weight="thin" className={styles.remove} />
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
