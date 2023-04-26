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

    if (imageUrls.length < 3) {
        errors.push('You need to add at least 3 images in order to continue');
    }

    if (!allowedTypes.includes(type)) {
        errors.push('Please select a type');
    }

    return errors;
}

export const validateDestinationData = (state, validCity) => {
    const { city, description } = state;
    const errors = [];

    const isCityValidated =
        !city.length == 0 && validCity.city?.toLowerCase() == city.toLowerCase();

    if (!isCityValidated) {
        errors.push('Please enter a valid city');
    }

    if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long');
    }

    return errors;
};
