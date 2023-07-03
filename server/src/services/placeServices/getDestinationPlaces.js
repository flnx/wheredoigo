const Place = require('../../models/placeSchema');

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .select({
            name: 1,
            city: 1,
            country: 1,
            type: 1,
            rating: 1,
            imageUrls: { $slice: ['$imageUrls', 1] },
        })
        .exec();

    const updatedPlaces = places.map((place) => ({
        _id: place._id,
        type: place.type,
        averageRating: place.averageRating,
        name: place.capitalizedName,
        city: place.capitalizedCity,
        country: place.capitalizedCountry,
        imageUrl: place.mainImage,
    }));

    return updatedPlaces;
}

module.exports = getDestinationPlaces;
