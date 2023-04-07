const Place = require('../models/placeSchema');
const capitalizeEachWord = require('../utils/capitalizeWords');
const Destination = require('../models/destinationSchema');

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
    const { destinationId, description, type, name } = data;

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    return [];

    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw new Error('All fields are required!');
    }

    const place = await Place.find({ destinationId }).lean().exec();

    if (!place) {
        throw new Error('Please enter a valid Place ID...')
    }

    // const place = await Place.create({
    //     ...placeData
    // });

    // return {
    //     _id: place._id,
    // };
}

module.exports = {
    addNewPlace,
    getPlaceById,
    getDestinationPlaces,
};
