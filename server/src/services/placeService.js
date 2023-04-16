const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

const { addImages } = require('../utils/cloudinaryUploader');
const { validateFields } = require('../utils/validateFields');
const { getDestinationAndCheckOwnership } = require('./destinationService');
const { validateObjectId } = require('../utils/validateObjectId');
const { createValidationError } = require('../utils/createValidationError');
const { errorMessages } = require('../constants/errorMessages');

async function getPlaceById(placeId) {
    const place = await Place.findById(placeId)
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: '-_id username avatarUrl' },
        })
        .lean()
        .exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    return place;
}

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .select({ name: 1, city: 1, type: 1, imageUrls: { $slice: 1 } })
        .lean()
        .exec();

    return places;
}

async function addNewPlace(data, images, user) {
    const { destinationId, name, description, type } = data;
    const { ownerId } = user;
    
    validateObjectId(destinationId);

    const destination = await getDestinationAndCheckOwnership(
        destinationId,
        ownerId
    );

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };


    validateFields(placeData);

    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country.name,
        imageUrls: [],
        comments: [],
        ownerId,
    });

    const folderName = 'places';
    const { imageUrls, imgError } = await addImages(images, place, folderName);

    place.imageUrls = imageUrls;
    await place.save();

    return {
        _id: place._id,
        imgError,
    };
}

async function addCommentToPlace(placeId, title, content, ownerId) {
    const user = await User.findById(ownerId).select('username avatarUrl').lean().exec();

    if (!user) {
        throw createValidationError(errorMessages.accessDenied, 401);
    }

    const place = await Place.findById(placeId).select('comments').exec();

    if (!place) {
        throw createValidationError(`Place ${errorMessages.notFound}`, 404);
    }

    if (content.length < 10) {
        throw createValidationError(errorMessages.invalidComment, 400);
    }

    if (title.length < 2) {
        throw createValidationError(errorMessages.commentTitle, 400);
    }

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        ownerId,
    });

    await comment.save();

    place.comments.push(comment);

    await place.save();

    console.log(user);

    return {
        ...comment.toObject(),
        ownerId: {
            avatarUrl: user.avatarUrl,
            username: user.username,
        },
    };
}

module.exports = {
    addNewPlace,
    getPlaceById,
    getDestinationPlaces,
    addCommentToPlace,
};
