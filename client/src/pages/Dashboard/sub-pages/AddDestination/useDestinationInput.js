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

    const updateDetail = (name, content) => {
        dispatch({
            type: 'details_change',
            payload: { name, content },
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
        updateDetail,
        state,
        updateCategory,
    };
};
