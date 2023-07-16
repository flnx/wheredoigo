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

        case 'details_change': {
            return {
                ...state,
                details: state.details.map((detail) => {
                    if (detail.name == action.payload.name) {
                        return {
                            ...detail,
                            content: action.payload.content,
                        };
                    } else {
                        return detail;
                    }
                }),
            };
        }

        default:
            return state;
    }
}

export const initialState = {
    description: '',
    city: '',
    country: '',
    categories: [],
    details: [
        {
            name: 'Good to Know',
            content: ''
        },
        {
            name: 'Transport',
            content: ''
        },
        {
            name: 'Local Customs',
            content: ''
        },
        {
            name: 'Pro Tips',
            content: ''
        },
    ],
};