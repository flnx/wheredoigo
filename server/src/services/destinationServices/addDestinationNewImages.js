const Destination = require('../../models/destinationSchema');
const uploadImages = require('../cloudinaryService/uploadImages');
const addImagesQuery = require('../../queries/addImagesQuery');

async function addDestinationNewImages(destinationId, imgFiles, destination) {
    const { city } = destination;

    const folderName = 'destinations';
    const data = { city, _id: destinationId };

    const { imageUrls, imgError } = await uploadImages(
        imgFiles,
        data,
        folderName,
        1
    );

    const query = addImagesQuery(destinationId, imageUrls);

    const result = await Destination.findOneAndUpdate(...query)
        .select('-ownerId -country -city -description -details -info -__v')
        .lean()
        .exec();

    const imageUrlsWithoutPublicId = result.imageUrls.map(
        ({ public_id, ...rest }) => rest
    );

    return {
        imageUrls: imageUrlsWithoutPublicId,
        imgError,
    };
}

module.exports = addDestinationNewImages;
