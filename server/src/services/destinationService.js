const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { matchCityAndCountry } = require('../utils/utils');

async function getDestinationByPage(page, limit, searchParams) {
    let regex = new RegExp(searchParams, 'i');

    const destination = await Destination.aggregate([
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country',
            },
        },
        { $unwind: '$country' },
        {
            $match: {
                $or: [
                    { city: { $regex: regex } },
                    { 'country.name': { $regex: regex } },
                ],
            },
        },
        {
            $skip: page,
        },
        {
            $limit: limit,
        },
    ]).exec();

    return destination;
}

async function getDestinationById(destinationId) {
    return Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();
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
        _id: destination._id,
    };
}

module.exports = {
    getDestinationByPage,
    addNewDestination,
    getDestinationById,
};