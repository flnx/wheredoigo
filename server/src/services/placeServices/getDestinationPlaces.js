const Place = require('../../models/placeSchema');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .select({
            name: 1,
            city: 1,
            type: 1,
            imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] },
        })
        .lean()
        .exec();

    places.forEach((x) => {
        x.name = capitalizeEachWord(x.name);
        x.city = capitalizeEachWord(x.name);
    });

    return places;
}

module.exports = getDestinationPlaces;