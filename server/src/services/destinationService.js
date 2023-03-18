const Destination = require('../models/destinationSchema');

async function getDestinationByPage(page, limit) {
    const destination = await Destination.find()
        .skip(page * limit)
        .limit(limit);

    return destination;
}

async function addNewDestination(data) {
    const destinationData = {
        country: data.country,
        city: data.city,
        description: data.description,
        details: data.details || [],
        imageUrls: data.imageUrls,
    };

    const isThereEmptyFields = Object.values(destinationData).some((x) => !x);

    if (isThereEmptyFields) {
        throw new Error('All fields are required!');
    }

    const destination = await Destination.create(destinationData);
    return destination;
}

module.exports = {
    getDestinationByPage,
    addNewDestination,
};
