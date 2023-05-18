export function validatePlaceData(state) {
    const { description, name, imageUrls, type } = state;
    const allowedTypes = ['Explore', 'Eat', 'Party'];

    const errors = [];

    if (description.trim().length < 10) {
        errors.push('Description must be between 10 and 5000 characters');
    }

    if (name.trim() < 1) {
        errors.push('Please add a place name');
    }

    if (imageUrls.length < 1) {
        errors.push('You need to add at least 3 images in order to continue');
    }

    if (!allowedTypes.includes(type)) {
        errors.push('Please select a type');
    }

    return errors;
}

export const validateDestinationData = (state) => {
    const { city, description } = state;
    const errors = [];

    const isCityValid = city && state.lastCityFetch.city.toLowerCase() == city.toLowerCase();

    if (!isCityValid) {
        errors.push('Please enter a valid city');
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
