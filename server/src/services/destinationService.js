const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');

const { fetchCity, fetchCountry } = require('../service/data');
const { addImages } = require('../utils/cloudinaryUploader');
const { createValidationError } = require('../utils/createValidationError');
const { validateFields } = require('../utils/validateFields');
const { errorMessages } = require('../constants/errorMessages');

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
            $project: {
                'country.name': 1,
                imageUrls: { $arrayElemAt: ['$imageUrls', 0] },
                city: 1,
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
    const destination = await Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();

    if (!destination) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    return destination;
}

async function create(data, images, user) {
    const { ownerId } = user;
    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
    };

    validateFields(destinationData);
    const cityData = await fetchCity(data.city);

    if (!Array.isArray(cityData) || !cityData[0].name) {
        throw createValidationError(errorMessages.invalidCity, 400);
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
    const { imageUrls, imgError } = await addImages(
        images,
        destination,
        folderName
    );

    destination.imageUrls = imageUrls;
    await destination.save();

    return {
        _id: destination._id,
        imgError,
    };
}

async function getDestinationAndCheckOwnership(destinationId, userId) {
    const destination = await Destination.findById(destinationId)
        .select('city country ownerId')
        .populate('country')
        .exec();

    if (!destination) {
        throw createValidationError(errorMessages.invalidDestination, 400);
    }

    if (!destination.ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    return destination;
}

module.exports = {
    getByPage,
    create,
    getById,
    getDestinationAndCheckOwnership,
};
