const Place = require('../../models/placeSchema');
const uploadImages = require('../cloudinaryService/uploadImages');
const { sanitizeHtmlString } = require('../../utils/validators/sanitizeHtmlString');

async function createNewPlace({ data, images, destination }) {
    const { name, description, type } = data;
    const { _id, city, country, ownerId } = destination;

    const clean = sanitizeHtmlString(description);

    const place = new Place({
        destinationId: _id,
        description: clean,
        imageUrls: [],
        comments: [],
        ownerId,
        city,
        country,
        name,
        type,
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
