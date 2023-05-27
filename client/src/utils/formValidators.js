export function validatePlaceData({ state, images, allowedCategories }) {
    const { description, name, type } = state;

    const errors = [];

    if (description.trim().length < 50 || description.trim().length > 5000) {
        errors.push('Description must be between 50 and 5000 characters');
    }

    if (name.trim().length < 1) {
        errors.push('Place name is required');
    }

    if (images.imageUrls.length < 4) {
        errors.push('You need to upload at least 4 images');
    }

    if (!allowedCategories.includes(type)) {
        errors.push('Please select a category type');
    }

    return errors;
}

export const validateDestinationData = (state, images, allowedCategories) => {
    const { city, description, category } = state;
    const errors = [];

    const isCityValid = city && state.lastCityFetch.city.toLowerCase() == city.toLowerCase();

    if (!isCityValid) {
        errors.push('Please enter a valid city');
    }

    if (images.imageUrls.length < 4) {
        errors.push('You need to add at least 4 images');
    }

    if (description.trim().length < 50 || description.trim().length > 5000) {
        errors.push('Description must be between 50 and 5000 characters');
    }

    if (!allowedCategories.includes(category)) {
        errors.push('Please select a category');
    }

    console.log(errors);

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
