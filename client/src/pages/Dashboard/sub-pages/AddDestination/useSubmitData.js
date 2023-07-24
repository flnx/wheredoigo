import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// React Query Hooks
import { useAddNewDestination } from 'src/hooks/queries/useAddDestination';

// Utils
import { createDestinationFormData } from 'src/utils/formData';
import { validateDestinationData } from 'src/utils/formValidators';

import routeConstants from 'src/constants/routeConstants';

export const useSubmitData = (images, state, categories) => {
    const [createDestination, error, isLoading] = useAddNewDestination();
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const errorsArr = validateDestinationData(state, images, categories);
        setErrors(errorsArr);

        if (errorsArr.length > 0) return;

        const formData = await createDestinationFormData(state, images);

        createDestination(formData, {
            onSuccess: (newDestination) => {
                const { routePath } = routeConstants.DESTINATIONS.BY_ID;
                navigate(routePath(newDestination._id));
            },
        });
    };

    return { submitHandler, isLoading, error, errors };
};
