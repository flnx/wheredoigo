import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// React Query Hooks
import { useAddNewPlace } from 'src/hooks/queries/useAddPlace';

// Utils
import { validatePlaceData } from 'src/utils/formValidators';
import { createPlaceFormData } from 'src/utils/formData';
import { extractServerErrorMessage } from 'src/utils/utils';

import routeConstants from 'src/constants/routeConstants';

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

        const formData = await createPlaceFormData(state, images);

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
