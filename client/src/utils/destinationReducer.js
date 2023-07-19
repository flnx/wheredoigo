export function destinationFormReducer(state, action) {
    switch (action.type) {
        case 'change':
            if (action.payload.name === 'country') {
                return {
                    ...state,
                    [action.payload.name]: action.payload.value,
                    city: '', // Reset city to an empty string when country is changed
                };
            } else {
                return {
                    ...state,
                    [action.payload.name]: action.payload.value,
                };
            }

        case 'UPDATE_DESCRIPTION':
            return {
                ...state,
                description: {
                    text: action.payload.value,
                    charCounter: action.payload.charCounter,
                },
            };

        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };

        case 'REMOVE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category !== action.payload
                ),
            };

        case 'DETAILS_CHANGE': {
            return {
                ...state,
                details: state.details.map((detail) =>
                    detail.name == action.payload.name
                        ? { ...detail, content: action.payload.content }
                        : detail
                ),
            };
        }

        default:
            return state;
    }
}

export const initialState = {
    description: {
        charCounter: 0,
        text: '',
    },
    city: '',
    country: '',
    categories: [],
    details: [
        {
            name: 'Good to Know',
            content: '',
        },
        {
            name: 'Transport',
            content: '',
        },
        {
            name: 'Local Customs',
            content: '',
        },
        {
            name: 'Pro Tips',
            content: '',
        },
    ],
};
