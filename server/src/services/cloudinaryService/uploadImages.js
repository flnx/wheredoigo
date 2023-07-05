const uploadImagesToCloudinary = require('./upload/uploadImagesToCloudinary');

// Config
const { imagesOptions } = require('../../config/cloudinary');

// Utils
const validateUploadImagesFields = require('../../utils/validators/validateUploadImages');
const fixInvalidFolderNameChars = require('../../utils/cloudinary/fixInvalidFolderNameChars');

async function uploadImages(images, data, mainFolder, minImagesRequired = 1) {
    try {
        validateUploadImagesFields(data, mainFolder);
        // Specify the sub-folder name for Cloudinary
        const subFolder = fixInvalidFolderNameChars(data.city, data._id);

        // Pass the folder names to the options
        const imageOptions = imagesOptions(mainFolder, subFolder);

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
