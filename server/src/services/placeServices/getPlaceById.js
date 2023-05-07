const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceById(placeId, user) {
    const place = await Place.findById(placeId)
        .select('-commentedBy -comments')
        .lean()
        .exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (user && place.ownerId.equals(user.ownerId)) {
        place.isOwner = true;
    }

    // checks if the user already commented/rated the place
    let hasCommented = null;

    if (user) {
        hasCommented = await Place.exists({
            _id: placeId,
            commentedBy: { $in: [user.ownerId] },
        });
    }

    const { imageUrls, ownerId, rating, ...placeData } = place;

    // remove public_id from images
    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    // calc the avg place rating
    const { sumOfRates, numRates } = rating;
    const averageRating = +(sumOfRates / numRates).toFixed(2);

    return {
        ...placeData,
        name: capitalizeEachWord(place.name),
        city: capitalizeEachWord(place.city),
        country: capitalizeEachWord(place.country),
        imageUrls: updatedImgUrls,
        isAuth: !!user,
        hasCommented: !!hasCommented,
        averageRating,
    };
}

module.exports = getPlaceById;
