import { useReducer } from 'react';
import { imagesReducer } from '../utils/imagesReducer';
import { initialState } from '../utils/imagesReducer';

export const useImages = () => {
    const [images, dispatch] = useReducer(imagesReducer, initialState);

    const addImages = (files) => {
        dispatch({
            type: 'add_images',
            payload: {
                files: Array.from(files),
            },
        });
    };

    const deleteImage = (index) => {
        dispatch({
            type: 'delete_image',
            index,
        });
    };

    const resetState = () => dispatch({ type: 'reset' });

    return { images, addImages, deleteImage, resetState };
};
