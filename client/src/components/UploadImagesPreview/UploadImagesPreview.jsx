import { ImageThumbnailsPreview } from '../ImageThumbnailsPreview/ImageThumbnailsPreview';

import styles from './UploadImagesPreview.module.css';

export const UploadImagesPreview = ({ addImages, deleteImage, images }) => {
    const handleImageSelect = (e) => {
        addImages(e.target.files);
    };

    const handleDeleteImage = (e, index) => {
        deleteImage(index);
    };

    return (
        <div className={styles.formField}>
            <div>
                <label htmlFor="images" className={styles.btn}>
                    Upload images
                </label>
                <input
                    className={styles.file}
                    type="file"
                    accept="image/*"
                    multiple
                    name="images"
                    id="images"
                    required
                    onChange={handleImageSelect}
                />
            </div>

            <ImageThumbnailsPreview 
                images={images} 
                handleDeleteImage={handleDeleteImage} 
            />
        </div>
    );
};
