export const initialState = {
    description: '',
    city: '',
    country: '',
    details: [
        {
            category: 'Good to Know',
            info: [],
        },
        {
            category: 'Transport',
            info: [],
        },
        {
            category: 'Local Customs',
            info: [],
        },
        {
            category: 'Pro Tips',
            info: [],
        },
    ],
};

export function destinationFormReducer(state, action) {
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
