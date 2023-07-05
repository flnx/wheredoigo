const Place = require('../../models/placeSchema');
const uploadImages = require('../cloudinaryService/uploadImages');
const { validatePlaceFields } = require('../../utils/validateFields');

async function createNewPlace(data, images, destination, ownerId) {
    const { destinationId, name, description, type } = data;

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    validatePlaceFields(placeData);

    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country,
        imageUrls: [],
        comments: [],
        ownerId,
    });

    const folderName = 'places';
    const { imageUrls, imgError } = await uploadImages(images, place, folderName, 4);

    place.imageUrls = imageUrls;
    await place.save();

    return {
        _id: place._id,
        imgError,
    };
}

module.exports = createNewPlace;
