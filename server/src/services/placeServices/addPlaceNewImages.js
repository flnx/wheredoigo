const Place = require('../../models/placeSchema');

// utils
const { addImages } = require('../../utils/cloudinaryUploader');
const { validateImages } = require('../../utils/validateImages');

async function addPlaceNewImages(placeId, imgFiles, place) {
    // Validate the image files
    validateImages(imgFiles, 1);

    const { city } = place;

    const folderName = 'places';
    const data = { city, _id: placeId };

    // Add images and get the result and any error
    const { imageUrls, imgError } = await addImages(imgFiles, data, folderName);

    // Update the place document with the new image URLs
    const result = await Place.findOneAndUpdate(
        { _id: placeId },
        {
            $push: {
                imageUrls: { $each: imageUrls },
                $slice: -imageUrls.length, // Limits the size of the 'imageUrls' array to the last 'images.length' elements (it doesnt delete the old ones)
            },
        },
        {
            new: true,
            projection: {
                _id: 0,
                imageUrls: { $slice: -imageUrls.length }, // Return only the newly added images in the 'imageUrls' field
            },
        }
    )
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
