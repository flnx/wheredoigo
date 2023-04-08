import { useReducer } from 'react';
import { useAddNewPlace } from '../../hooks/queries/useAddPlace';
import { useNavigate, useParams } from 'react-router-dom';

import { initialState, placeReducer } from '../../utils/placeReducer';

// Components
import { UploadImagesPreview } from '../../components/UploadImagesPreview/UploadImagesPreview';
import { createPlaceFormData } from '../../utils/formData';

import styles from './AddPlace.module.css';

export const AddPlace = () => {
    const [state, dispatch] = useReducer(placeReducer, initialState);
    const { destinationId } = useParams();
    const [createPlace, createError, isLoading] = useAddNewPlace();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const formData = await createPlaceFormData(state, destinationId);

        createPlace(formData, {
            onSuccess: (newPlace) => {
                console.log(newPlace);
                // navigate(`/places/${newPlace._id}`);
            },
        });
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
