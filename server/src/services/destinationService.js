const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');
const { fetchCity, fetchCountry } = require('../service/data');
const { addImages } = require('../utils/cloudinaryUploader');
const { validateFields } = require('../utils/validateFields');

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
                $or: [{ city: { $regex: regex } }, { 'country.name': { $regex: regex } }],
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
    const destination = await Destination.findById(destinationId).populate('country').lean().exec();

    if (!destination) {
        const error = new Error('Not Found');
        res.status = 404;
        throw error;
    }

    return destination;
}

async function create(data, images, user) {
    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
    };

    const { ownerId } = user;

    validateFields(destinationData);

    const cityData = await fetchCity(data.city);

    if (!Array.isArray(cityData) || !cityData[0].name) {
        const error = new Error('Invalid City Parameters');
        error.status(400);
        throw error;
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

async function getDestinationAndCheckOwnership(destinationId, userId) {
    const destination = await Destination.findById(destinationId)
        .select('city country ownerId')
        .populate('country')
        .exec();

    if (!destination) {
        const error = new Error('Please enter a valid destination ID');
        error.status = 400;
        throw error;
    }

    if (!destination.ownerId.equals(userId)) {
        const error = new Error('Access Denied!');
        error.status = 403;
        throw error;
    }

    return destination;
}

module.exports = {
    getByPage,
    create,
    getById,
    getDestinationAndCheckOwnership,
};
