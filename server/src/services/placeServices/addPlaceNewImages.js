const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { addImages } = require('../../utils/cloudinaryUploader');

async function addPlaceNewImages(placeId, imgFiles, place) {
    if (!Array.isArray(imgFiles) || imgFiles.length == 0) {
        throw createValidationError(errorMessages.invalidImages, 400);
    }
    
    const { city } = place;

    const folderName = 'places';
    const data = { city, _id: placeId };

    const imagesData = await addImages(imgFiles, data, folderName);
    const images = imagesData.imageUrls;
    const imgError = imagesData.imgError;

    if (images.length == 0) {
        throw new Error(errorMessages.uploadError, 500);
    }

    const result = await Place.findOneAndUpdate(
        { _id: placeId },
        { $push: { imageUrls: { $each: images }, $slice: -images.length } },
        { new: true, projection: { _id: 0, imageUrls: { $slice: -images.length } } }
    )
        .select('-ownerId -country -city -description -type -comments -name -__v')
        .lean()
        .exec();

    const imageUrls = result.imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        imageUrls,
        imgError,
    };
}

module.exports = addPlaceNewImages;
