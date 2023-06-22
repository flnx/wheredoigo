import { useReducer } from 'react';
import {
    destinationFormReducer,
    initialState,
} from '../../../../utils/destinationReducer';

export const useDestinationInput = () => {
    const [state, dispatch] = useReducer(destinationFormReducer, initialState);

    const updateField = (name, value) => {
        dispatch({
            type: 'change',
            payload: { name, value },
        });
    };

    const updateLastCityFetch = (city, country) => {
        dispatch({
            type: 'last_city_fetched',
            payload: { city, country },
        });
    };

    const updateDetail = (name, description, category) => {
        dispatch({
            type: 'details_change',
            category,
            payload: { name, description },
        });
    };

    const updateCategory = (category) => {
        if (state.categories.includes(category)) {
            dispatch({ type: 'REMOVE_CATEGORY', payload: category });
        } else {
            dispatch({ type: 'ADD_CATEGORY', payload: category });
        }
    };

    return {
        updateField,
        updateLastCityFetch,
        updateDetail,
        state,
        updateCategory
    };
};
