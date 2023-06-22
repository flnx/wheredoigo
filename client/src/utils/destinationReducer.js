export function destinationFormReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
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

        case 'last_city_fetched':
            return {
                ...state,
                lastCityFetch: {
                    city: action.payload.city,
                    country: action.payload.country,
                },
            };

        case 'reset_last_fetch':
            return {
                ...state,
                lastCityFetch: { city: '', country: '' },
            };

        case 'details_change': {
            return {
                ...state,
                details: state.details.map((detail) => {
                    if (detail.category == action.category) {
                        const updateInfo = detail.info.map((x) =>
                            x.name == action.payload.name
                                ? {
                                      ...x,
                                      description: action.payload.description,
                                  }
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

export const initialState = {
    description: '',
    city: '',
    lastCityFetch: {
        city: '',
        country: '',
    },
    country: '',
    categories: [],
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
            info: [
                {
                    name: 'cycling',
                    title: 'Cycling',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'publicTransport',
                    title: 'Public Transport',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'taxis',
                    title: 'Taxis',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'rideesharing',
                    title: 'Rideesharing',
                    description: '',
                    rows: 6,
                },
            ],
        },
        {
            category: 'Local Customs',
            info: [
                {
                    name: 'drinking',
                    title: 'Drinking',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'greetings',
                    title: 'Greetings',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'personalSpace',
                    title: 'Personal Space',
                    description: '',
                    rows: 6,
                },
                {
                    name: 'additionalInfo',
                    title: 'Additional info',
                    description: '',
                    rows: 6,
                },
            ],
        },
        {
            category: 'Pro Tips',
            info: [
                {
                    name: 'beforeYouGo',
                    title: 'Any tips you can give about this destination? 😎',
                    description: '',
                    rows: 25,
                },
            ],
        },
    ],
};
