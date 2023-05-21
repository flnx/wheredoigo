const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { createValidationError } = require('../../utils/createValidationError');

async function getDestinationById(destinationId, user) {
    const promises = [
        Destination.findById(destinationId).populate('country').select('-likes').lean().exec(),
    ];

    if (user) {
        const isLikedByUserPromise = Destination.exists({
            _id: destinationId,
            likes: { $elemMatch: { userId: user.ownerId } },
        });

        promises.push(isLikedByUserPromise);
    }

    const [destination, isLikedByUser] = await Promise.all(promises);

    if (!destination) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const { ownerId, country, city, imageUrls, ...destinationWithoutOwnerId } = destination;

    if (user && ownerId.equals(user.ownerId)) {
        destinationWithoutOwnerId.isOwner = true;
    }

    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        ...destinationWithoutOwnerId,
        imageUrls: updatedImgUrls,
        country: capitalizeEachWord(country.name),
        city: capitalizeEachWord(city),
        isLikedByUser: !!isLikedByUser,
    };
}

module.exports = getDestinationById;
