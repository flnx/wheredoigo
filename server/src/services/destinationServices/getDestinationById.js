const Destination = require('../../models/destinationSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const capitalizeEachWord = require("../../utils/capitalizeWords");
const { createValidationError } = require("../../utils/createValidationError");

async function getDestinationById(destinationId, user) {
    const destination = await Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();

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
    };
}

module.exports = getDestinationById;
