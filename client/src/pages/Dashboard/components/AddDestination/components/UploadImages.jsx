import { useState } from 'react';
import styles from '../AddDestination.module.css';
import { X } from 'phosphor-react';

export const UploadImages = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        const imageFiles = files
            .filter((file) => file.type.startsWith('image/'))
            .map((x) => URL.createObjectURL(x));

        setSelectedImages(imageFiles);
    };

    const handleDeleteImage = (index) => {
        const newImages = [...selectedImages];
        URL.revokeObjectURL(newImages[index]);
        newImages.splice(index, 1);
        setSelectedImages(newImages);
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
                {selectedImages.map((img, i) => (
                    <div
                        key={i}
                        className={styles.imgContainer}
                        onClick={() => handleDeleteImage(i)}
                    >
                        <img src={img} alt={`image preview ${i}`} />
                        <X size={80} weight="thin" className={styles.remove} />
                    </div>
                ))}
            </div>
        </div>
    );
};
