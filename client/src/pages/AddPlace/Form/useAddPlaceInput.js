import { useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';
import { useAddNewPlace } from '../../../hooks/queries/useAddPlace';

import { initialState, placeReducer } from '../../../utils/placeReducer';
import { validatePlaceData } from '../../../utils/formValidators';
import { createPlaceFormData } from '../../../utils/formData';
import { extractServerErrorMessage } from '../../../utils/utils';

import routeConstants from '../../../constants/routeConstants';

export const useFormInput = ({ destinationId, allowedCategories }) => {
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

    return { handleSubmit, state, handleChange, errors, dispatchHandler, isLoading };
};
