const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');

const { isObject } = require('../utils/utils');
const validator = require('validator');

const { fetchCity, fetchCountry } = require('../service/data');
const { addImages, deleteImage } = require('../utils/cloudinaryUploader');
const { createValidationError } = require('../utils/createValidationError');
const { validateFields } = require('../utils/validateFields');
const { errorMessages } = require('../constants/errorMessages');
const capitalizeEachWord = require('../utils/capitalizeWords');

require('dotenv').config();

async function getByPage(page, limit, searchParams) {
    let regex = new RegExp(searchParams, 'i');

    const destinations = await Destination.aggregate([
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
                imageUrls: {
                    $ifNull: [{ $arrayElemAt: ['$imageUrls', 0] }, []],
                },
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

    destinations.forEach((item) => {
        delete item.imageUrls.public_id;
    });

    return destinations;
}

async function getById(destinationId, user) {
    const destination = await Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();

    if (!destination) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const { ownerId, country, city, imageUrls, ...destinationWithoutOwnerId } =
        destination;
    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    if (user && ownerId.equals(user.ownerId)) {
        destinationWithoutOwnerId.isOwner = true;
    }

    return {
        ...destinationWithoutOwnerId,
        imageUrls: updatedImgUrls,
        country: capitalizeEachWord(country.name),
        city: capitalizeEachWord(city),
    };
}

async function getCreatorDestinations(ownerId) {
    const destinations = await Destination.find(
        { ownerId },
        { city: 1, imageUrls: { $slice: 1 } }
    )
        .populate('country', 'name')
        .lean()
        .exec();

    if (destinations.length == 0) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    destinations.forEach((x) => {
        const { country, imageUrls } = x;

        x.country = capitalizeEachWord(country.name);
        x.city = capitalizeEachWord(x.city);
        x.imageUrls = imageUrls[0]?.imageUrl;
    });

    return destinations;
}

async function getDestinationAndCheckOwnership(destinationId, userId) {
    const destination = await Destination.findById(destinationId)
        .populate('country')
        .lean()
        .exec();

    if (!destination) {
        throw createValidationError(errorMessages.invalidDestination, 400);
    }

    const { ownerId, ...destinationWithoutOwnerId } = destination;

    if (!ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    destinationWithoutOwnerId.country = capitalizeEachWord(
        destination.country.name
    );
    destinationWithoutOwnerId.city = capitalizeEachWord(destination.city);
    return destinationWithoutOwnerId;
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

async function deleteDestinationImage(destinationId, userId, imgId) {
    if (!isValid(imgId)) {
        throw createValidationError(errorMessages.invalidImageId, 400);
    }

    const destination = await getDestinationAndCheckOwnership(
        destinationId,
        userId
    );

    const imageData = destination.imageUrls.find(
        (x) => x._id.toString() === imgId
    );

    if (!imageData) {
        throw createValidationError(errorMessages.invalidImageId, 400);
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const result = await Destination.updateOne(
            { _id: destinationId },
            { $pull: { imageUrls: { _id: imgId } } },
            { session }
        )
            .lean()
            .exec();

        await deleteImage(imageData.public_id);
        await session.commitTransaction();

        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

async function editDestinationField(destinationId, userId, updatedFieldData) {
    await getDestinationAndCheckOwnership(destinationId, userId);

    if (!isObject(updatedFieldData)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    if (!Object.hasOwn(updatedFieldData, 'description')) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const { description, infoId, categoryId } = updatedFieldData;

    if (!validator.isLength(description, { min: 10, max: 5000 })) {
        throw createValidationError(errorMessages.description, 400);
    }

    if (infoId == 'Description') {
        const result = await editDescription(destinationId, description);

        return result;
    }

    if (!isValid(infoId) || !isValid(categoryId)) {
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const result = await editDetail(
        destinationId,
        categoryId,
        infoId,
        description
    );
    return result;
}

async function editDescription(destinationId, description) {
    const result = await Destination.findByIdAndUpdate(
        destinationId,
        { description },
        { new: true, select: 'description' }
    )
        .lean()
        .exec();

    if (!result) {
        throw createValidationError(errorMessages.invalidDestination, 400);
    }

    return result;
}

async function editDetail(destinationId, categoryId, infoId, updatedValue) {
    const result = await Destination.updateOne(
        {
            _id: destinationId,
            'details._id': categoryId,
            'details.info._id': infoId,
        },
        { $set: { 'details.$[det].info.$[inf].description': updatedValue } },
        {
            arrayFilters: [{ 'det._id': categoryId }, { 'inf._id': infoId }],
            projection: { 'details.$[det].info.$[inf].description': 1 },
            new: true,
        }
    )
        .lean()
        .exec();

    if (!result) {
        throw createValidationError(errorMessages.invalidDestination, 400);
    }

    return result;
}

module.exports = {
    getByPage,
    create,
    getById,
    getDestinationAndCheckOwnership,
    getCreatorDestinations,
    editDestinationField,
    deleteDestinationImage,
};
