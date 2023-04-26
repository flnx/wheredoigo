const mongoose = require('mongoose');
const validator = require('validator');
const { isValid } = mongoose.Types.ObjectId;

const Country = require('../models/countrySchema');
const Destination = require('../models/destinationSchema');
const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');

const { fetchCity, fetchCountry } = require('../service/data');
const {
    addImages,
    deleteImage,
    deleteMultipleImages,
} = require('../utils/cloudinaryUploader');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { isObject, extractCloudinaryFolderName } = require('../utils/utils');
const { createValidationError } = require('../utils/createValidationError');
const { validateFields } = require('../utils/validateFields');
const { errorMessages } = require('../constants/errorMessages');

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

    if (user && ownerId.equals(user.ownerId)) {
        destinationWithoutOwnerId.isOwner = true;
    }

    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        ...destinationWithoutOwnerId,
        imageUrls: updatedImgUrls,
        country: capitalizeEachWord(country.name),
        city: capitalizeEachWord(city),
    };
}

async function getDestinationOwnerIdOnly(destinationId) {
    return Destination.findById(destinationId)
        .select('ownerId city country')
        .populate('country', 'name')
        .lean()
        .exec();
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
        throw createValidationError(errorMessages.notAddedYet, 404);
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
        throw createValidationError(errorMessages.notFound, 404);
    }

    const { ownerId, ...destinationWithoutOwnerId } = destination;

    if (!ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    destinationWithoutOwnerId.country = capitalizeEachWord(destination.country.name);
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
        throw createValidationError(errorMessages.notFound, 404);
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

async function addDestinationNewImages(destinationId, imgFiles, destination) {
    if (!Array.isArray(imgFiles) || imgFiles.length == 0) {
        throw createValidationError(errorMessages.invalidImages, 400);
    }

    const { city } = destination;

    const folderName = 'destinations';
    const data = { city, _id: destinationId };

    const imagesData = await addImages(imgFiles, data, folderName);
    const images = imagesData.imageUrls;
    const imgError = imagesData.imgError;

    if (images.length == 0) {
        throw new Error(errorMessages.uploadError, 500);
    }

    const result = await Destination.findOneAndUpdate(
        { _id: destinationId },
        { $push: { imageUrls: { $each: images }, $slice: -images.length } },
        { new: true, projection: { _id: 0, imageUrls: { $slice: -images.length } } }
    )
        .select('-ownerId -country -city -description -details -info -__v')
        .lean()
        .exec();

    const imageUrls = result.imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        imageUrls,
        imgError,
    };
}

async function deleteDestinationImage(destinationId, imgId, destination) {
    if (!imgId || !isValid(imgId)) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const imageData = destination.imageUrls.find((x) => x._id.toString() === imgId);

    if (!imageData) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const result = await Destination.updateOne(
        { _id: destinationId },
        { $pull: { imageUrls: { _id: imgId } } }
    )
        .lean()
        .exec();

    let cloudinary_error = null;

    try {
        await deleteImage(imageData.public_id);
    } catch (err) {
        cloudinary_error = err.message;
    }

    result.cloud_error = cloudinary_error;
    return result;
}

async function deleteDestination(destinationId, userId) {
    const [destination, places] = await Promise.all([
        Destination.findById(destinationId).lean().exec(),
        Place.find({ destinationId }).lean().exec(),
    ]);

    if (!destination) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!destination.ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    const public_ids = extractAllPublicIds();
    const folderNames = extractFolderNames();

    const comments_ids = places.flatMap((p) => p.comments.map((c) => c.toString()));

    const promises = [
        Destination.findByIdAndDelete(destinationId),
        Place.deleteMany({ destinationId }),
        deleteMultipleImages(public_ids, folderNames),
        Comment.deleteMany({ _id: { $in: comments_ids } }),
    ];

    await Promise.all(promises);

    return true;

    function extractAllPublicIds() {
        const destPublicIds = destination.imageUrls.map(
            ({ public_id, ...rest }) => public_id
        );

        const placesPublicIds = places.flatMap((x) => {
            const ids = x.imageUrls.map(({ public_id, ...rest }) => public_id);
            return ids;
        });

        return destPublicIds.concat(placesPublicIds);
    }

    function extractFolderNames() {
        const d_path = 'destinations';
        const { city } = destination;
        const destFolderName = extractCloudinaryFolderName(
            d_path,
            city,
            destinationId
        );

        const p_path = 'places';

        const placesFolderNames = places.map((place) => {
            let { name, _id } = place;
            _id = _id.toString();

            const placeFolderName = extractCloudinaryFolderName(p_path, name, _id);
            return placeFolderName;
        });

        return [destFolderName, ...placesFolderNames];
    }
}

async function editDestinationField(destinationId, userId, updatedFieldData) {
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

    if (!infoId || !categoryId || !isValid(infoId) || !isValid(categoryId)) {
        // if either infoId or categoryId is missing or not a valid ObjectId, throw a validation error
        throw createValidationError(errorMessages.invalidBody, 400);
    }

    const result = await editDetail(destinationId, categoryId, infoId, description);
    return result;

    async function editDescription(destinationId, description) {
        const result = await Destination.findByIdAndUpdate(
            destinationId,
            { description },
            { new: true, select: 'description' }
        )
            .lean()
            .exec();

        if (!result) {
            throw createValidationError(errorMessages.notFound, 404);
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
            }
        )
            .lean()
            .exec();

        if (!result) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (result.matchedCount === 0) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        return result;
    }
}

module.exports = {
    getByPage,
    create,
    getById,
    getDestinationAndCheckOwnership,
    getCreatorDestinations,
    editDestinationField,
    deleteDestinationImage,
    addDestinationNewImages,
    deleteDestination,
    getDestinationOwnerIdOnly,
};
