import { useReducer } from 'react';
import { initialState, placeReducer } from '../../../../utils/placeReducer';

import styles from './AddPlace.module.css';

export const AddPlace = () => {
    const [state, dispatch] = useReducer(placeReducer, initialState);

    function handleSubmit(e) {
        e.preventDefault();
        // handle form submission
    }

    function handleChange(e) {
        const { name, value } = e.target;
        dispatch({
            type: 'change',
            payload: {
                name,
                value,
            },
        });
    }

    function handleAddImages(e) {
        dispatch({
            type: 'add_images',
            payload: {
                files: Array.from(e.target.files),
            },
        });
    }

    function handleDeleteImage(index) {
        dispatch({
            type: 'delete_image',
            index,
        });
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <label className={styles.formLabel}>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formRow}>
                <label className={styles.formLabel}>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleChange}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formRow}>
                <label className={styles.formLabel}> Type:</label>
                <select
                    name="type"
                    value={state.type}
                    onChange={handleChange}
                    className={styles.formSelect}
                >
                    <option value="">--Select Type--</option>
                    <option value="Explore">Explore</option>
                    <option value="Eat">Eat</option>
                    <option value="Party">Party</option>
                </select>
            </div>
            <div className={styles.formRow}>
                <label className={styles.formLabel}> Images:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleAddImages}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formImageContainer}>
                {state.imageUrls.map((url, index) => (
                    <div key={index} className={styles.formImage}>
                        <img src={url} alt={`image ${index}`} className={styles.formImagePreview} />
                        <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className={styles.formImageButton}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <button type="submit" className={styles.formButton}>
                Submit
            </button>
        </form>
    );
};
