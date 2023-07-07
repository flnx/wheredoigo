const Destination = require("../../models/destinationSchema");

// Utils
const capitalizeEachWord = require("../../utils/capitalizeWords");

async function getCreatorDestinations(ownerId) {
    const destinations = await Destination.find(
        { ownerId },
        { city: 1, imageUrls: { $slice: 1 } }
    )
        .populate('country', 'name')
        .lean()
        .exec();

    destinations.forEach((x) => {
        const { country, imageUrls } = x;

        x.country = capitalizeEachWord(country.name);
        x.city = capitalizeEachWord(x.city);
        x.imageUrls = imageUrls[0]?.imageUrl;
    });

    return destinations;
}

module.exports = getCreatorDestinations;