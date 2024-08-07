import { createImageFiles } from './imagesHandler';

export const createDestinationFormData = async (state, images) => {
    const formData = new FormData();

    formData.append('city', state.city);
    formData.append('country', state.country);
    formData.append('description', state.description.text);
    formData.append('categories', JSON.stringify(state.categories));
    formData.append('details', JSON.stringify(state.details));

    await createImageFiles(images.imageUrls, formData);

    return formData;
};

export const createPlaceFormData = async (state, images) => {
    const formData = new FormData();

    formData.append('name', state.name);
    formData.append('type', state.type);
    formData.append('description', state.description.text);

    await createImageFiles(images.imageUrls, formData);

    return formData;
};

export const createImagesFormData = async (state) => {
    const formData = new FormData();
    await createImageFiles(state.imageUrls, formData);
    return formData;
};
