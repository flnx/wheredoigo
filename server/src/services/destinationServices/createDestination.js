const Destination = require('../../models/destinationSchema');
const Country = require('../../models/countrySchema');

const { createValidationError } = require('../../utils/createValidationError');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { validateDestinationFields } = require('../../utils/validateFields');

// Services
const { fetchACountryAndItsCities } = require('../getCityCountryData');
const uploadImages = require('../cloudinaryService/uploadImages');

async function createDestination(data, images, user) {
    const { ownerId } = user;

    const destinationData = {
        city: data.city,
        country: data.country,
        description: data.description,
        details: JSON.parse(data.details) || [],
        category: JSON.parse(data.category),
    };

    // Validation
    const categories = validateDestinationFields(destinationData);
    await validateCountryAndCity(destinationData.country, destinationData.city);

    const country = await addCountry(destinationData.country);

    const destination = new Destination({
        ...destinationData,
        category: categories,
        country: country._id,
        imageUrls: [],
        likes: [],
        ownerId,
    });

    const folderName = 'destinations';
    const { imageUrls, imgError } = await uploadImages(
        images,
        destination,
        folderName,
        4
    );

    destination.imageUrls = imageUrls;
    await destination.save();

    return {
        _id: destination._id,
        imgError,
    };

    async function validateCountryAndCity(countryStr, cityStr) {
        // fetches the country and its cities
        const countryData = await fetchACountryAndItsCities(countryStr);

        // finds the city provided by the client
        const city = countryData.find(
            (c) => c.toLowerCase() === cityStr.toLowerCase()
        );

        // if the city is not found in the provided country cities array, it throws
        if (!city) {
            throw createValidationError(errorMessages.data.city, 400);
        }
    }

    async function addCountry(countryName) {
        // looks for the country

        let checkCountryInDB = await Country.findOne({
            name: countryName.toLowerCase(),
        })
            .lean()
            .exec();

        // checks if the country already exists. If not, it adds it
        if (!checkCountryInDB) {
            checkCountryInDB = await Country.create({ name: countryName });
        }

        return checkCountryInDB;
    }
}

module.exports = createDestination;
