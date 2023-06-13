export function imagesReducer(state, action) {
    switch (action.type) {
        case 'add_images': {
            const imageFiles = action.payload.files
            .filter((file) => file.type.startsWith('image/'))
            .map((x) => URL.createObjectURL(x));
            
            return {
                ...state,
                imageUrls: [...state.imageUrls, ...imageFiles],
            };
        }

        case 'delete_image': {
            const newImages = [...state.imageUrls];
            URL.revokeObjectURL(newImages[action.index]);

            newImages.splice(action.index, 1);

            return {
                ...state,
                imageUrls: newImages,
            };
        }

        case 'reset' : {
            return initialState
        }

        default:
            return state;
    }
}

export const initialState = {
    imageUrls: [],
};
