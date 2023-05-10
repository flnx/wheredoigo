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
            return state;
    }
}

export const initialState = {
    description: '',
    city: '',
    country: '',
    category: '',
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
    imageUrls: [],
};
