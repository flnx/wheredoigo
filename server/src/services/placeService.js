const Place = require('../models/placeSchema');

async function addNewPlace(data) {
    const placeData = {
        destinationId: data.destinationId,
        country: data.country,
        city: data.city,
        description: data.description,
        place: data.place,
        imageUrls: data.imageUrls || [],
    };

    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw new Error('All fields are required!');
    }

    const place = await Place.create(placeData);

    return {
        _id: place._id,
    };
}

module.exports = {
    addNewPlace
}