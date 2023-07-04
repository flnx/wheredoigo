const Place = require('../../models/placeSchema');
const filteredAndSortedPlacesPipeline = require('../../pipelines/topPlacesPipeline');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getTopPlaces() {
    // Create pipelines based on categories
    const explorePipeline = filteredAndSortedPlacesPipeline(['Explore', 'Fun']);
    const eatPipeline = filteredAndSortedPlacesPipeline(['Eat']);


    const promises = [
        Place.aggregate(explorePipeline),
        Place.aggregate(eatPipeline),
    ];

    // Fetching the data
    const [exploreAndFunPlaces, eatPlaces] = await Promise.all(promises);

    const updatedExplorePlaces = exploreAndFunPlaces.map((place) => ({
        ...place,
        name: capitalizeEachWord(place.name),
        city: capitalizeEachWord(place.city),
        country: capitalizeEachWord(place.country),
    }));

    const updatedEatPlaces = eatPlaces.map((place) => ({
        ...place,
        name: capitalizeEachWord(place.name),
        city: capitalizeEachWord(place.city),
        country: capitalizeEachWord(place.country),
    }));

    return {
        explorePlaces: updatedExplorePlaces,
        eatPlaces: updatedEatPlaces,
    };
}

module.exports = getTopPlaces;
