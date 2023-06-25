import styles from './ImageUploader.module.css';

export const ImageUploader = ({ addImages }) => {
    const handleImageSelect = (e) => {
        addImages(e.target.files);
        
        // chrome wouldn't upload the same file twice so I reset the input manually
        const { target = {} } = e || {};
        target.value = "";
    };

    return (
        <div className={styles.formField}>
            <div>
                <label htmlFor="images" className={styles.btn} role={'upload-button'}>
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
                    data-testid="hidden-file-input"
                />
            </div>
        </div>
    );
};
