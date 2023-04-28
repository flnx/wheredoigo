const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { addImages } = require('../../utils/cloudinaryUploader');

async function addDestinationNewImages(destinationId, imgFiles, destination) {
    if (!Array.isArray(imgFiles) || imgFiles.length == 0) {
        throw createValidationError(errorMessages.invalidImages, 400);
    }

    const { city } = destination;

    const folderName = 'destinations';
    const data = { city, _id: destinationId };

    const imagesData = await addImages(imgFiles, data, folderName);
    const images = imagesData.imageUrls;
    const imgError = imagesData.imgError;

    if (images.length == 0) {
        throw new Error(errorMessages.uploadError, 500);
    }

    const result = await Destination.findOneAndUpdate(
        { _id: destinationId },
        { $push: { imageUrls: { $each: images }, $slice: -images.length } },
        { new: true, projection: { _id: 0, imageUrls: { $slice: -images.length } } }
    )
        .select('-ownerId -country -city -description -details -info -__v')
        .lean()
        .exec();

    const imageUrls = result.imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        imageUrls,
        imgError,
    };
}

module.exports = addDestinationNewImages;