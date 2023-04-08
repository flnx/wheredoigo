export const createFormData = async (state) => {
    const formData = new FormData();

    formData.append('city', state.city);
    formData.append('country', state.country);
    formData.append('description', state.description);
    formData.append('details', JSON.stringify(state.details));

    const fetchPromises = state.imageUrls.map(async (url, index) => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const contentType = blob.type;

            if (!validateImageFile(contentType)) {
                console.log('Only image files are allowed');
                return;
            }

            const fileExtension = '.' + contentType.split('/')[1];
            const file = new File([blob], `image-${index}${fileExtension}`, {
                type: contentType,
            });

            formData.append('imageUrls', file);
        } catch (error) {
            console.log(error);
        }
    });

    await Promise.all(fetchPromises);

    return formData;
};

const validateImageFile = (contentType) => {
    const imagePattern = /^image\/(jpe?g|png|webp)$/i;
    return imagePattern.test(contentType);
};

export const validateForm = (state, validCity) => {
    const { city, description } = state;
    const errors = [];

    const isCityValidated = !city.length == 0 && validCity.city?.toLowerCase() == city.toLowerCase();

    if (!isCityValidated) {
        errors.push('Please enter a valid city');
    }

    if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long.');
    }

    return errors;
};
