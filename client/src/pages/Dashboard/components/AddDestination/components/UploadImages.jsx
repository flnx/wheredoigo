import styles from '../AddDestination.module.css';
import { X } from 'phosphor-react';

export const UploadImages = ({ dispatchHandler, images }) => {
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
            index,
            type: 'delete_image',
        });
    };

    return (
        <div className={styles.formField}>
            <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="images" className={styles.uploadBtn}>
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
                        onClick={(ev) => handleDeleteImage(ev, i)}
                    >
                        <img src={img} alt={`image preview ${i}`} />
                        <X size={80} weight="thin" className={styles.remove} />
                    </div>
                ))}
            </div>
        </div>
    );
};
