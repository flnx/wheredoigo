import { useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';

import { useAddNewPlace } from '../../../hooks/queries/useAddPlace';
import { initialState, placeReducer } from '../../../utils/placeReducer';
import { validatePlaceData } from '../../../utils/formValidators';
import { createPlaceFormData } from '../../../utils/formData';
import { extractServerErrorMessage } from '../../../utils/utils';

// Components
import { UploadImagesPreview } from '../../../components/UploadImagesPreview/UploadImagesPreview';
import { ShowFormError } from '../../../components/ShowFormError/ShowFormError';
import { DarkOverlay } from '../../../components/DarkOverlay/DarkOverlay';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

import routeConstants from '../../../constants/routeConstants';
import styles from './Form.module.css';

export const Form = ({ destinationId, allowedCategories }) => {
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

        const dataValidationErrors = validatePlaceData(state, allowedCategories);
        setErrors(dataValidationErrors);

        if (dataValidationErrors.length !== 0) return;

        const formData = await createPlaceFormData(state, destinationId);

        createPlace(formData, {
            onSuccess: (newPlace) => {
                const { routePath } = routeConstants.PLACES.BY_ID;
                navigate(routePath(newPlace._id));
            },
            onError: (err) => {
                const errorMessage = extractServerErrorMessage(err);
                setErrors([errorMessage]);
            },
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'change', payload: { name, value } });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input name={state.name} onChangeHandler={handleChange} errors={errors} />
            <Textarea
                description={state.description}
                onChangeHandler={handleChange}
                errors={errors}
            />
            <Select
                type={state.type}
                onChangeHandler={handleChange}
                errors={errors}
                categories={allowedCategories}
            />

            <div className={styles.formRow}>
                <UploadImagesPreview
                    dispatchHandler={dispatchHandler}
                    images={state.imageUrls}
                />
                <ShowFormError errors={errors} errorParam={'images'} />
            </div>
            <button type="submit" className={styles.formButton} disabled={isLoading}>
                Submit
            </button>
            {isLoading && <DarkOverlay isLoading={isLoading} />}
        </form>
    );
};
