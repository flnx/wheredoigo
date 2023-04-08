import styles from './UploadImagesPreview.module.css';
import { X } from 'phosphor-react';

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

            <div className={styles.uploadedImages}>
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={styles.imgContainer}
                        onClick={() => handleDeleteImage(i)}
                    >
                        <img src={img} alt={`image preview ${i}`} />
                        <X size={40} weight="thin" className={styles.remove} />
                    </div>
                ))}
            </div>
        </div>
    );
};
