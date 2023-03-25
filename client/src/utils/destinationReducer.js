export const initialState = {
    description: '',
    city: '',
    country: '',
    details: [
        {
            category: 'Good to Know',
            info: [
                {
                    name: 'timezone',
                    title: 'What is the timezone?',
                    description: '',
                    rows: 1,
                },
                {
                    name: 'plugTypes',
                    title: 'What are the voltage/plug types?',
                    description: '',
                    rows: 3,
                },
                {
                    name: 'currency',
                    title: 'What is the currency?',
                    description: '',
                    rows: 3,
                },
                {
                    name: 'atms',
                    title: 'Are ATMs readily accessible?',
                    description: '',
                    rows: 3,
                },
                {
                    name: 'creditCards',
                    title: 'Are credit cards widely accepted?',
                    description: '',
                    rows: 3,
                },
                {
                    name: 'tipping',
                    title: 'How much do I tip?',
                    description: '',
                    rows: 3,
                },
                {
                    name: 'wifi',
                    title: 'Is WiFi widely available?',
                    description: '',
                    rows: 3,
                },
            ],
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

        case 'details_change': {
            return {
                ...state,
                details: state.details.map((detail) => {
                    if (detail.category == action.category) {
                        const updateInfo = detail.info.map((x) =>
                            x.name == action.payload.name
                                ? { ...x, description: action.payload.description }
                                : x
                        );

                        return {
                            ...detail,
                            info: updateInfo,
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
