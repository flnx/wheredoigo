import { useReducer, useState } from 'react';
import { useAddNewPlace } from '../../hooks/queries/useAddPlace';
import { useNavigate, useParams } from 'react-router-dom';

import { initialState, placeReducer } from '../../utils/placeReducer';
import { validatePlaceData } from '../../utils/formValidators';

// Components
import { UploadImagesPreview } from '../../components/UploadImagesPreview/UploadImagesPreview';
import { createPlaceFormData } from '../../utils/formData';

import styles from './AddPlace.module.css';
import { useRequestCreatePlacePermissions } from '../../hooks/queries/useRequestCreatePlacePermissions';

export const AddPlace = () => {
    const { destinationId } = useParams();
    const permissions = useRequestCreatePlacePermissions(destinationId);
    const [createPlace, createError, isLoading] = useAddNewPlace(destinationId);
    const [state, dispatch] = useReducer(placeReducer, initialState);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    if (permissions.isLoading) {
        return <h1>...Loading...</h1>
    }

    if (permissions.error) {
        navigate(-1, { replace: true });
        return null;
    }


    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const dataValidationErrors = validatePlaceData(state);
        setErrors(dataValidationErrors);

        if (dataValidationErrors.length != 0) {
            return;
        }

        const formData = await createPlaceFormData(state, destinationId);

        createPlace(formData, {
            onSuccess: (newPlace) => {
                navigate(`/places/${newPlace._id}`);
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

    const errorMessage = createError?.response?.data || createError?.message;

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
                <ShowError errors={errors} searchParam={'name'} />
                {errors.length == 0 && errorMessage && <span className={styles.error}>{errorMessage}</span>}
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
                <ShowError errors={errors} searchParam={'description'} />
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
                <ShowError errors={errors} searchParam={'type'} />
            </div>

            <div className={styles.formRow}>
                <ShowError errors={errors} searchParam={'images'} />
                <UploadImagesPreview dispatchHandler={dispatchHandler} images={state.imageUrls} />
            </div>

            <button type="submit" className={styles.formButton} disabled={isLoading}>
                Submit
            </button>
        </form>
    );
};

const ShowError = ({ errors, searchParam }) => {
    const errorChecker = (name) => {
        return errors.find((e) => e.includes(name));
    };

    return (
        errorChecker(searchParam) && (
            <span className={styles.error}>{errorChecker(searchParam)}</span>
        )
    );
};
