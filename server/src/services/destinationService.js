const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { matchCityAndCountry } = require('../utils/utils');

async function getDestinationByPage(page, limit) {
    const destination = await Destination.find()
        .skip(page * limit)
        .limit(limit)
        .lean()
        .exec();

    return destination;
}

async function addNewDestination(data) {
    const destinationData = {
        city: data.city,
        country: data.country,
        description: data.description,
        details: data.details || [],
        imageUrls: data.imageUrls || [],
    };

    const isFieldEmpty = Object.values(destinationData).some((x) => !x);
    const areCityCountryValid = matchCityAndCountry(data?.city, data?.country);

    if (!areCityCountryValid || isFieldEmpty) {
        throw new Error('Invalid data!');
    }

    const countryName = data.country.toLowerCase();

    let country = await Country.findOne({ name: countryName }).exec();

    if (!country) {
        country = await Country.create({ name: countryName });
    }

    const destination = await Destination.create({
        ...destinationData,
        country: country._id,
    });

    return {
        ...destinationData,
        _id: destination._id,
        country: capitalizeEachWord(destinationData.country),
        city: capitalizeEachWord(destinationData.city),
    };
}

module.exports = {
    getDestinationByPage,
    addNewDestination,
};
