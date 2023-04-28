const Destination = require('../../models/destinationSchema');
const Country = require('../../models/countrySchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { validateFields } = require('../../utils/validateFields');
const { createValidationError } = require('../../utils/createValidationError');
const { addImages } = require('../../utils/cloudinaryUploader');

// Services
const { fetchCity, fetchCountry } = require('../getCityCountryData');

async function createDestination(data, images, user) {
    const { ownerId } = user;

    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
    };

    validateFields(destinationData);
    const cityData = await fetchCity(data.city);

    if (!Array.isArray(cityData) || !cityData[0].name) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const countryData = await fetchCountry(cityData[0].country);
    const countryName = countryData[0].name;

    let country = await Country.findOne({
        name: countryName.toLowerCase(),
    }).exec();

    if (!country) {
        country = await Country.create({ name: countryName });
    }

    const destination = await Destination.create({
        ...destinationData,
        country: country._id,
        imageUrls: [],
        ownerId,
    });

    const folderName = 'destinations';
    const { imageUrls, imgError } = await addImages(images, destination, folderName);

    destination.imageUrls = imageUrls;
    await destination.save();

    return {
        _id: destination._id,
        imgError,
    };
}

module.exports = createDestination;