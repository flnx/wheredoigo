const Place = require('../../models/placeSchema');

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
        imageUrls: { $slice: ['$imageUrls', 1] }
    };

    const options = { limit: 9 };

    const places = await Place.find(query, projection, options).exec();

    const updatedPlaces = places.map((place) => ({
        _id: place._id,
        type: place.type,
        averageRating: place.averageRating,
        name: place.capitalizedName,
        city: place.capitalizedCity,
        country: place.capitalizedCountry,
        imageUrl: place.mainImage
    }));

    return updatedPlaces;
}

module.exports = getPlaces;
