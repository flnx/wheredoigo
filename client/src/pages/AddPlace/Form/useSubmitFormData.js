import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// React Query Hooks
import { useAddNewPlace } from 'src/hooks/queries/useAddPlace';

// Utils
import { createPlaceFormData } from 'src/utils/formData';
import { extractServerErrorMessage } from 'src/utils/utils';

// Validation
import { validateAddNewPlaceSchema } from 'src/utils/validationSchemas/placeSchemas';

import routeConstants from 'src/constants/routeConstants';

export const useSubmitFormData = ({
    destinationId,
    allowedCategories,
    state,
    images,
}) => {
    const [createPlace, isLoading, serverError] = useAddNewPlace(destinationId);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        const { description, type, name } = state;
        const { imageUrls } = images;

        try {
            await validateAddNewPlaceSchema(allowedCategories).validate(
                { description, type, name, imageUrls },
                { abortEarly: false }
            );

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
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    return { handleSubmit, errors, isLoading, serverError };
};
