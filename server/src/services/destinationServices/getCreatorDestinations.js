const Destination = require("../../models/destinationSchema");
const { errorMessages } = require("../../constants/errorMessages");

// utils
const capitalizeEachWord = require("../../utils/capitalizeWords");
const { createValidationError } = require("../../utils/createValidationError");

async function getCreatorDestinations(ownerId) {
    const destinations = await Destination.find(
        { ownerId },
        { city: 1, imageUrls: { $slice: 1 } }
    )
        .populate('country', 'name')
        .lean()
        .exec();

    if (destinations.length == 0) {
        throw createValidationError(errorMessages.notAddedYet, 404);
    }

    destinations.forEach((x) => {
        const { country, imageUrls } = x;

        x.country = capitalizeEachWord(country.name);
        x.city = capitalizeEachWord(x.city);
        x.imageUrls = imageUrls[0]?.imageUrl;
    });

    return destinations;
}

module.exports = getCreatorDestinations;