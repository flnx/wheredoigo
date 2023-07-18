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
            payload: { name, value, charCount },
        });
    };

    const updateDescription = (value, charCounter) => {
        dispatch({
            type: 'UPDATE_DESCRIPTION',
            payload: { value, charCounter },
        });
    };

    const updateDetail = (name, content) => {
        dispatch({
            type: 'DETAILS_CHANGE',
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
        updateDescription
    };
};
