export function placeReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };

        case 'description':
            return {
                ...state,
                description: {
                    text: action.payload.content,
                    charCounter: action.payload.charCounter
                }
            }
        default:
            return state;
    }
}

export const initialState = {
    name: '',
    description: {
        text: '',
        charCounter: 0
    },
    type: '',
};
