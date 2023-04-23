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

export const createImagesFormData = async (state) => {
    const formData = new FormData();
    await createImageFiles(state.imageUrls, formData);
    return formData;
}