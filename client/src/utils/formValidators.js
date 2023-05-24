export function validatePlaceData(state, allowedCategories) {
    const { description, name, imageUrls, type } = state;

    const errors = [];

    if (description.trim().length < 50 || description.trim().length > 5000) {
        errors.push('Description must be between 50 and 5000 characters');
    }

    if (name.trim().length < 1) {
        errors.push('Place name is required');
    }

    if (imageUrls.length < 4) {
        errors.push('You need to upload at least 4 images');
    }

    if (!allowedCategories.includes(type)) {
        errors.push('Please select a category');
    }

    return errors;
}

export const validateDestinationData = (state) => {
    const { city, description, imageUrls } = state;
    const errors = [];

    const isCityValid = city && state.lastCityFetch.city.toLowerCase() == city.toLowerCase();

    if (!isCityValid) {
        errors.push('Please enter a valid city');
    }

    if (imageUrls.length < 4) {
        errors.push('You need to add at least 4 images');
    }

    if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long');
    }

    return errors;
};

export const validateCategories = (searchParams) => {
    const allowed = [
        'Beach',
        'Mountains',
        'Cultural',
        'Snow',
        'Islands',
        'Adventure',
    ];

    const enteredCategories = searchParams.getAll('category') || [];

    const filteredCategories = enteredCategories
        .filter((x) => allowed.includes(x))
        .filter((value, index, self) => self.indexOf(value) === index); // Filter out repeating values

    return filteredCategories;
};
