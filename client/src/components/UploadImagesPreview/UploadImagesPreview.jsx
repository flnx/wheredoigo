import { ImageThumbnailsPreview } from '../ImageThumbnailsPreview/ImageThumbnailsPreview';

import styles from './UploadImagesPreview.module.css';

export const UploadImagesPreview = ({ dispatchHandler, images }) => {
    const handleImageSelect = (e) => {
        dispatchHandler({
            type: 'add_images',
            payload: {
                files: Array.from(e.target.files),
            },
        });
    };

    const handleDeleteImage = (e, index) => {
        dispatchHandler({
            type: 'delete_image',
            index,
        });
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
