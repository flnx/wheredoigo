const { errorMessages } = require('../../constants/errorMessages');
const Place = require('../../models/placeSchema');

// utils
const { addImages } = require('../../utils/cloudinaryUploader');
const { createValidationError } = require('../../utils/createValidationError');
const { validatePlaceFields } = require('../../utils/validateFields');
const { validateImages } = require('../../utils/validateImages');

async function createNewPlace(data, images, destination, ownerId) {
    const { destinationId, name, description, type } = data;

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    validatePlaceFields(placeData);
    validateImages(images, 4); // at least 4 images

    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country,
        imageUrls: [],
        comments: [],
        ownerId,
    });

    const folderName = 'places';
    const { imageUrls, imgError } = await addImages(images, place, folderName);

    if (imageUrls.length == 0) {
        throw createValidationError(`${errorMessages.serverError} ${imgError}`, 500);
    }

    place.imageUrls = imageUrls;
    await place.save();

    return {
        _id: place._id,
        imgError,
    };
}

module.exports = createNewPlace;
