const Destination = require('../../models/destinationSchema');

// utils
const { addImages } = require('../../utils/cloudinaryUploader');

async function addDestinationNewImages(destinationId, imgFiles, destination) {
    const { city } = destination;

    const folderName = 'destinations';
    const data = { city, _id: destinationId };

    const { imageUrls, imgError } = await addImages(imgFiles, data, folderName, 1);

    const result = await Destination.findOneAndUpdate(
        { _id: destinationId },
        {
            $push: {
                imageUrls: { $each: imageUrls },
                $slice: -imageUrls.length,
            },
        },
        {
            new: true,
            projection: {
                _id: 0,
                imageUrls: {
                    $slice: -imageUrls.length,
                },
            },
        }
    )
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
