export const createImageFiles = async (imageUrls, formData) => {
    const fetchPromises = imageUrls.map(async (url, index) => {
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
};

const validateImageFile = (contentType) => {
    const imagePattern = /^image\/(jpe?g|png|webp)$/i;
    return imagePattern.test(contentType);
};