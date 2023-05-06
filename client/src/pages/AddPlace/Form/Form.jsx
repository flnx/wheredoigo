import { useReducer, useState } from 'react';
import { UploadImagesPreview } from '../../../components/UploadImagesPreview/UploadImagesPreview';
import { ShowError } from './ShowError';

import { useAddNewPlace } from '../../../hooks/queries/useAddPlace';
import { initialState, placeReducer } from '../../../utils/placeReducer';
import { validatePlaceData } from '../../../utils/formValidators';
import { createPlaceFormData } from '../../../utils/formData';
import { extractServerErrorMessage } from '../../../utils/utils';

import routeConstants from '../../../constants/routeConstants';
const { PLACES } = routeConstants;

import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

export const Form = ({ destinationId }) => {
    const [createPlace, isLoading] = useAddNewPlace(destinationId);
    const [state, dispatch] = useReducer(placeReducer, initialState);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const dataValidationErrors = validatePlaceData(state);
        setErrors(dataValidationErrors);

        if (dataValidationErrors.length !== 0) {
            return;
        }

        const formData = await createPlaceFormData(state, destinationId);

        createPlace(formData, {
            onSuccess: (newPlace) => {
                navigate(`${PLACES.BY_ID.routePath(newPlace._id)}`);
            },
            onError: (err) => {
                const errorMessage = extractServerErrorMessage(err);
                setErrors([errorMessage]);
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
                <ShowError errors={errors} errorParam={'name'} />
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
                <ShowError errors={errors} errorParam={'description'} />
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
                <ShowError errors={errors} errorParam={'type'} />
                <ShowError errors={errors} errorParam={'all'} />
            </div>

            <div className={styles.formRow}>
                <ShowError errors={errors} errorParam={'images'} />
                <UploadImagesPreview
                    dispatchHandler={dispatchHandler}
                    images={state.imageUrls}
                />
            </div>

            <button type="submit" className={styles.formButton} disabled={isLoading}>
                Submit
            </button>
        </form>
    );
};
