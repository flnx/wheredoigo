export const createImageFiles = async (imageUrls, formData) => {
    const fetchPromises = imageUrls.map(async (url, index) => {
        const isDev = url.includes('localhost');
        const isTestUrl = isDev && url.includes('test-path');
        const validUrl = isTestUrl ? 'test-path' : url;

        try {
            const res = await fetch(validUrl);
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
            if (!isTestUrl) {
                console.error(error.message || error);
            }
        }
    });

    await Promise.all(fetchPromises);
};

export const createAvatarImage = async (imgAfterCrop) => {
    // Convert the image to a Blob object
    const response = await fetch(imgAfterCrop);
    const blob = await response.blob();
    const contentType = blob.type;

    if (!validateImageFile(contentType)) {
        throw new Error('Only image files are allowed');
    }

    // Create a File object from the Blob
    const image = new File([blob], 'image.jpg', { type: 'image/jpeg' });

    // Create a FormData object and append the File object to it
    const formData = new FormData();
    formData.append('avatarUrl', image, 'avatar.jpg');

    return formData;
};

const validateImageFile = (contentType) => {
    const imagePattern = /^image\/(jpe?g|png|webp|gif)$/i;
    return imagePattern.test(contentType);
};
