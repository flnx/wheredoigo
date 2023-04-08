import { useReducer } from 'react';
import { initialState, placeReducer } from '../../../../utils/placeReducer';

import styles from './AddPlace.module.css';
import { UploadImagesPreview } from '../../../../components/UploadImagesPreview/UploadImagesPreview';

export const AddPlace = () => {
    const [state, dispatch] = useReducer(placeReducer, initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'change',
            payload: {
                name,
                value,
            },
        });
    };

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="name">
                    Name:
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={state.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Add place name"
                />
            </div>
            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="description">
                    Description:
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows="8"
                    value={state.description}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Add place description..."
                />
            </div>
            <div className={styles.formRow}>
                <label className={styles.formLabel} htmlFor="type">
                    Type:
                </label>
                <select
                    id="type"
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
                <UploadImagesPreview dispatchHandler={dispatchHandler} images={state.imageUrls} />
            </div>

            <button type="submit" className={styles.formButton}>
                Submit
            </button>
        </form>
    );
};
