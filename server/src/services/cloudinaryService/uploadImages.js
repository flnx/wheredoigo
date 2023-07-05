const uploadImagesToCloudinary = require('./upload/uploadImagesToCloudinary');

// Config
const { imagesOptions } = require('../../config/cloudinary');

// Utils
const { fixInvalidFolderNameChars } = require('../../utils/utils');

async function uploadImages(images, data, folderName, minImagesRequired = 1) {
    try {
        // Set the folder type and name for Cloudinary
        const folder_type = folderName;
        const folder_name = fixInvalidFolderNameChars(data.city, data._id);
        const imageOptions = imagesOptions(folder_type, folder_name);

        // Upload the images to Cloudinary
        const cloudinaryImagesData = await uploadImagesToCloudinary(
            images,
            imageOptions,
            minImagesRequired
        );

        // Gets the imageUrl and the publicId from the response for each images
        const imageUrls = cloudinaryImagesData
            .filter((imageData) => imageData.url) // not needed but in case cloudinary mess up
            .map((imageData) => ({
                imageUrl: imageData.url,
                public_id: imageData.public_id,
            }));

        let imgError = null;

        // Attaches error message to notify the client if some of the images failed to upload
        if (imageUrls.length != minImagesRequired) {
            imgError = 'Some images failed to upload :(';
        }

        return {
            imageUrls,
            imgError,
        };
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports = uploadImages;
