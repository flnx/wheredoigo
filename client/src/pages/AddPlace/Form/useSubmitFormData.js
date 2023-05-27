import { useNavigate } from 'react-router-dom';
import { useAddNewPlace } from '../../../hooks/queries/useAddPlace';
import { useState } from 'react';

import { validatePlaceData } from '../../../utils/formValidators';
import { createPlaceFormData } from '../../../utils/formData';
import { extractServerErrorMessage } from '../../../utils/utils';

import routeConstants from '../../../constants/routeConstants';

export const useSubmitFormData = ({ destinationId, allowedCategories, state, images }) => {
    const [createPlace, isLoading, serverError] = useAddNewPlace(destinationId);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const dataValidationErrors = validatePlaceData({ state, images, allowedCategories });
        setErrors(dataValidationErrors);

        if (dataValidationErrors.length !== 0) return;

        const formData = await createPlaceFormData(state, images, destinationId);

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

    return { handleSubmit, errors, isLoading, serverError };
};
