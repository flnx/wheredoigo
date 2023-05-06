const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceById(placeId, user) {
    const place = await Place.findById(placeId)
        .select('-commentedBy')
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username avatarUrl' },
        })
        .lean()
        .exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (user && place.ownerId.equals(user.ownerId)) {
        place.isOwner = true;
    }

    // Adds isOwner boolean if the current user (if any) is the owner of the comment
    place.comments.forEach((comment) => {
        // Removes ownerId._id prop (the original owner id) before sending it to the client
        const { _id, ...ownerData } = comment.ownerId;

        if (user && _id.equals(user.ownerId)) {
            comment.isOwner = true;
        }

        comment.ownerId = {
            ...ownerData,
            username: capitalizeEachWord(ownerData.username),
        };
    });

    const { imageUrls, ownerId, rating, ...placeData } = place;

    // remove public_id from images
    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    // remove rating info and add average rating
    const { sumOfRates, numRates } = rating;
    const averageRating = +(sumOfRates / numRates).toFixed(2);

    const hasCommented = user && await Place.exists({
        _id: placeId,
        commentedBy: { $in: [user.ownerId] },
    });

    return {
        ...placeData,
        name: capitalizeEachWord(place.name),
        city: capitalizeEachWord(place.city),
        country: capitalizeEachWord(place.country),
        imageUrls: updatedImgUrls,
        averageRating,
        isAuth: !!user,
        hasCommented: !!hasCommented,
    };
}

module.exports = getPlaceById;
