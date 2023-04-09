export function placeReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
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
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const initialState = {
    name: '',
    description: '',
    type: '',
    imageUrls: [],
};
