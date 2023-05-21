const Destination = require('../../models/destinationSchema');
const Country = require('../../models/countrySchema');

// utils
const { validateFields } = require('../../utils/validateFields');
const { addImages } = require('../../utils/cloudinaryUploader');

// Services
const { fetchCity, fetchCountry } = require('../getCityCountryData');

async function createDestination(data, images, user) {
    const { ownerId } = user;

    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
        category: data.category,
    };

    validateFields(destinationData);

    const cityData = await fetchCity(data.city);
    const country = await addCountry(cityData);

    const destination = await Destination.create({
        ...destinationData,
        country: country._id,
        imageUrls: [],
        likes: [],
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

    async function addCountry(cityData) {
        const countryData = await fetchCountry(cityData[0].country);
        const countryName = countryData[0].name;

        let checkCountryInDB = await Country.findOne({
            name: countryName.toLowerCase(),
        })
            .lean()
            .exec();

        if (!checkCountryInDB) {
            checkCountryInDB = await Country.create({ name: countryName });
        }

        return checkCountryInDB;
    }
}

module.exports = createDestination;
