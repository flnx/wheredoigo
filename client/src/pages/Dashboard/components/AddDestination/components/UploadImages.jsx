import { useState } from 'react';
import styles from '../AddDestination.module.css';

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

    console.log(selectedImages);

    return (
        <div className={styles.formField}>
            <label htmlFor="description">Upload Images</label>
            <input
                type="file"
                accept="image/*"
                multiple
                name="images"
                id="images"
                required
                onChange={handleImageSelect}
            />

            <div>
                {selectedImages.map((img, i) => (
                    <div key={i}>
                        <img src={img} alt={`image preview ${i}`} />
                        <button onClick={() => handleDeleteImage(i)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
