import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// React Query Hooks
import { useAddNewDestination } from 'src/hooks/queries/useAddDestination';

// Validation
import { createDestinationSchema } from 'src/utils/validationSchemas/destinationSchemas';

// Utils
import { createDestinationFormData } from 'src/utils/formData';

import routeConstants from 'src/constants/routeConstants';

export const useSubmitData = (images, state, categories) => {
    const [createDestination, error, isLoading] = useAddNewDestination();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        try {
            await createDestinationSchema(categories).validate(
                {
                    ...state,
                    imageUrls: images.imageUrls,
                    description: state.description.text,
                    charCounter: state.description.charCounter,
                },
                { abortEarly: false }
            );

            const formData = await createDestinationFormData(state, images);

            createDestination(formData, {
                onSuccess: (newDestination) => {
                    const { routePath } = routeConstants.DESTINATIONS.BY_ID;
                    navigate(routePath(newDestination._id));
                },
            });
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    return { submitHandler, isLoading, error, errors };
};
