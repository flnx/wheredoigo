const Place = require('../../models/placeSchema');
const addImagesQuery = require('../../queries/addImagesQuery');
const uploadImages = require('../cloudinaryService/uploadImages');

async function addPlaceNewImages(placeId, imgFiles, place) {
    const { city } = place;

    const folderName = 'places';
    const data = { city, _id: placeId };

    // Upload the images
    const { imageUrls, imgError } = await uploadImages(imgFiles, data, folderName);

    const query = addImagesQuery(placeId, imageUrls);

    // Update the place document with the new image URLs
    const result = await Place.findOneAndUpdate(...query)
        .select('-ownerId -country -city -description -type -comments -name -__v')
        .lean()
        .exec();

    // Remove the 'public_id' field from each image URL
    const imageUrlsWithoutPublicIds = result.imageUrls.map(
        ({ public_id, ...rest }) => rest
    );

    // Return the updated image URLs and any error that occurred
    return {
        imageUrls: imageUrlsWithoutPublicIds,
        imgError,
    };
}

module.exports = addPlaceNewImages;
