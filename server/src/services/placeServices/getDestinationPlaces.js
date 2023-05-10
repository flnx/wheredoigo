const Place = require('../../models/placeSchema');

// utils
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .select({
            name: 1,
            city: 1,
            country: 1,
            type: 1,
            rating: 1,
            imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] },
        })
        .lean()
        .exec();

    const updatedPlaces = places.map((place) => {
        const { name, country, city, rating, ...placeData } = place;

        const { sumOfRates, numRates } = rating;
        const averageRating = +(sumOfRates / numRates).toFixed(2) || 0;

        return {
            ...placeData,
            averageRating,
            name: capitalizeEachWord(name),
            country: capitalizeEachWord(country),
            city: capitalizeEachWord(city),
        };
    });

    return updatedPlaces;
}

module.exports = getDestinationPlaces;
