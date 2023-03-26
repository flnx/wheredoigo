const City = require('../models/citySchema');
const Place = require('../models/placeSchema');
const capitalizeEachWord = require('../utils/capitalizeWords');

async function getPlaceById(placeId) {
    const place = await Place.findById(placeId).lean().exec();

    if (!place) {
        throw new Error('404 Not Found');
    }

    place.city = capitalizeEachWord(place.city);

    return place;
}

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId }).lean().exec();

    return places;
}

async function addNewPlace(data) {
    const placeData = {
        destinationId: data.destinationId,
        country: data.country,
        description: data.description,
        place: data.place,
        imageUrls: data.imageUrls || [],
    };

    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw new Error('All fields are required!');
    }

    let city = await City.findOne({
        city: { $regex: new RegExp(data.city, 'i') },
    }).exec();

    if (!city) {
        city = await City.create({ name: data.city });
    }

    const place = await Place.create({
        ...placeData
    });

    return {
        _id: place._id,
    };
}

module.exports = {
    addNewPlace,
    getPlaceById,
    getDestinationPlaces,
};
