const Place = require('../../models/placeSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceById(placeId, user) {
    const place = await Place.findById(placeId)
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

    place.name = capitalizeEachWord(place.name);
    place.city = capitalizeEachWord(place.city);
    place.country = capitalizeEachWord(place.country);
    place.isAuth = user ? true : false;

    const { imageUrls, ownerId, ...placeData } = place;
    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        ...placeData,
        imageUrls: updatedImgUrls,
    };
}

module.exports = getPlaceById;
