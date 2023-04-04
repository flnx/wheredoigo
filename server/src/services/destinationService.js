const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
const { matchCityAndCountry } = require('../utils/utils');
require('dotenv').config();

async function getByPage(page, limit, searchParams) {
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

async function getById(destinationId) {
    return Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();
}

async function create(data, images) {
    const imageUrls = [];
    let imgError = null;

    try {
        const cloudinaryImagesData = await handleImageUploads(images);

        cloudinaryImagesData.forEach((x) => imageUrls.push(x.url));
    } catch (err) {
        imgError = err;
    }

    const destinationData = {
        city: data.city,
        country: data.country,
        description: data.description,
        details: data.details || [],
        imageUrls,
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

async function fetchCity(city) {
    if (!city) {
        throw new Error('Invalid city data');
    }

    const result = await fetch(process.env.CITY_URL + city, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.X_API_KEY,
        },
    });

    const data = await result.json();

    return data;
}

module.exports = {
    getByPage,
    create,
    getById,
    fetchCity,
};
