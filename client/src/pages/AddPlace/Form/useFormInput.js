import { useReducer } from 'react';
import { initialState, placeReducer } from 'src/utils/placeReducer';

export const useFormInput = () => {
    const [state, dispatch] = useReducer(placeReducer, initialState);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'change', payload: { name, value } });
    };

    const onDescriptionChangeHandler = (content, charCounter) => {
        dispatch({ type: 'description', payload: { content, charCounter } });
    };

    return { state, onChangeHandler, onDescriptionChangeHandler };
};
