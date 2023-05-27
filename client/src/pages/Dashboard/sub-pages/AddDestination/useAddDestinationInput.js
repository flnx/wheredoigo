import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewDestination } from '../../../../hooks/queries/useAddDestination';

import { destinationFormReducer, initialState } from '../../../../utils/destinationReducer';
import { createDestinationFormData } from '../../../../utils/formData';
import { validateDestinationData } from '../../../../utils/formValidators';

import routeConstants from '../../../../constants/routeConstants';

export const useAddDestinationInput = () => {
    const [createDestination, createError, isLoading] = useAddNewDestination();
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);
    const [showDetail, setShowDetail] = useState({ category: null });
    const [errorMessages, setErrorMessages] = useState([]);
    const navigate = useNavigate();

    const dispatchHandler = (actions) => {
        dispatch(actions);
    };

    const showDetailHandler = (category) => {
        setShowDetail(category);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        const errors = validateDestinationData(state);
        setErrorMessages(errors);

        if (errors.length > 0) return;

        const formData = await createDestinationFormData(state);

        createDestination(formData, {
            onSuccess: (newDestination) => {
                const { routePath } = routeConstants.DESTINATIONS.BY_ID;
                navigate(routePath(newDestination._id));
            },
        });
    };

    const openedDetailsCategory = state.details.find(
        (x) => x.category == showDetail.category
    );

    return {
        dispatchHandler,
        showDetailHandler,
        submitHandler,
        openedDetailsCategory,
        createError,
        errorMessages,
        isLoading,
        showDetail,
        state
    };
};
