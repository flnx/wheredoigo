const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

const { addImages } = require('../utils/cloudinaryUploader');
const { validateFields } = require('../utils/validateFields');
const { getDestinationAndCheckOwnership } = require('./destinationService');
const { validateObjectId } = require('../utils/validateObjectId');

async function getPlaceById(placeId) {
    const place = await Place.findById(placeId)
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username' },
        })
        .lean()
        .exec();

    if (!place) {
        const error = new Error('404 Not Found');
        res.status = 404;
        throw error;
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

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    validateObjectId(destinationId);
    validateFields(placeData);

    const destination = await getDestinationAndCheckOwnership(destinationId, ownerId);

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
    const user = await User.findById(ownerId).select('username').lean().exec();

    if (!user) {
        const error = new Error('Access Denied!');
        error.status = 401;
        throw error;
    }

    const place = await Place.findById(placeId).select('comments').exec();

    if (!place) {
        const error = new Error('Place not found');
        error.status = 404;
        throw error;
    }

    if (content.length < 10) {
        const error = new Error('Title must be at least 2 characters long');
        error.status = 400;
        throw error;
    }

    if (title.length < 2) {
        const error = new Error('Place not found');
        error.status = 400;
        throw error;
    }

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        ownerId,
    });

    await comment.save();

    place.comments.push(comment);

    await place.save();

    return {
        ...comment.toObject(),
        ownerId: {
            _id: user._id,
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
