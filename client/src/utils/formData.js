import { createImageFiles } from "./imagesHandler";

export const createDestinationFormData = async (state) => {
    const formData = new FormData();

    formData.append('city', state.city);
    formData.append('country', state.country);
    formData.append('description', state.description);
    formData.append('details', JSON.stringify(state.details));

    await createImageFiles(state.imageUrls, formData);

    return formData;
};

export const createPlaceFormData = async (state, destinationId) => {
    const formData = new FormData();

    formData.append('destinationId', destinationId);
    formData.append('name', state.name);
    formData.append('type', state.type);
    formData.append('description', state.description);

    await createImageFiles(state.imageUrls, formData);

    return formData;
};


export const validateForm = (state, validCity) => {
    const { city, description } = state;
    const errors = [];

    const isCityValidated =
        !city.length == 0 &&
        validCity.city?.toLowerCase() == city.toLowerCase();

    if (!isCityValidated) {
        errors.push('Please enter a valid city');
    }

    if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }

    return errors;
};
