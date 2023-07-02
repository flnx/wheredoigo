const Place = require('../../models/placeSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getPlaces() {
    const query = {
        type: { $in: ['Explore', 'Eat'] },
        $or: [{ country: 'netherlands' }, { country: 'bulgaria' }],
    };

    const projection = {
        city: 1,
        country: 1,
        name: 1,
        type: 1,
        rating: 1,
        imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] }, // selects the main image only
    };

    const options = { limit: 9 };

    const places = await Place.find(query, projection, options).lean().exec();

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

module.exports = getPlaces;
