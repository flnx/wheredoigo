const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceById(placeId, user) {
    const place = await Place.findById(placeId)
        .select('-commentedBy -comments')
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

    return {
        ...place.toObject(),
        capitalizedName: place.capitalizedName,
        capitalizedCity: place.capitalizedCity,
        capitalizedCountry: place.capitalizedCountry,
        imageUrls: place.imageUrls.map(({ _id, imageUrl }) => ({ _id, imageUrl })),
        isAuth: !!user,
        hasCommented: !!hasCommented,
        averageRating: place.averageRating,
    };
}

module.exports = getPlaceById;
