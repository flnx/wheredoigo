export function placeReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    }
}

export const initialState = {
    name: '',
    description: '',
    type: '',
};
