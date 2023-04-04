const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');
const { fetchCity, fetchCountry } = require('../service.js/data');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
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
    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
    };

    const isMissingField = Object.values(destinationData).some((x) => !x);

    if (isMissingField) {
        throw new Error('Missing fields!');
    }

    const cityData = await fetchCity(data.city);

    if (!Array.isArray(cityData) || !cityData[0].name) {
        throw new Error('Invalid City Parameters');
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
    });

    const imageUrls = [];
    let imgError = null;

    try {
        const cloudinaryImagesData = await handleImageUploads(images);

        cloudinaryImagesData.forEach((x) => imageUrls.push(x.url));
    } catch (err) {
        imgError = err;
    }

    destination.imageUrls = imageUrls;
    await destination.save();

    return {
        _id: destination._id,
        imgError,
    };
}

module.exports = {
    getByPage,
    create,
    getById,
};
