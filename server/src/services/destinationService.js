const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');
const { fetchCity, fetchCountry } = require('../service/data');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
const { imagesOptions } = require('../config/cloudinary');
const { fixInvalidFolderNameChars } = require('../utils/utils');
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
    return Destination.findById(destinationId).populate('country').lean().exec();
}

async function create(data, images, user) {
    const destinationData = {
        city: data.city,
        description: data.description,
        details: JSON.parse(data.details) || [],
    };

    validateFields(destinationData)

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
        ownerId: user._id
    });

    const imageUrls = [];
    let imgError = null;

    try {
        const folder_type = 'destinations';
        const folder_name = fixInvalidFolderNameChars(destination.city, destination._id);

        const cloudinaryImagesData = await handleImageUploads(
            images,
            imagesOptions(folder_type, folder_name)
        );

        for (const imageData of cloudinaryImagesData) {
            if (imageData.url) {
                imageUrls.push({
                    imageUrl: imageData.url,
                    public_id: imageData.public_id,
                });
            } else {
                console.log('An image failed to upload:', imageData);
            }
        }
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
