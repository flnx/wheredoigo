const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

const { addImages } = require('../utils/cloudinaryUploader');
const { validateFields } = require('../utils/validateFields');
const { getDestinationAndCheckOwnership } = require('./destinationService');

async function getPlaceById(placeId) {
    const place = await Place.findById(placeId)
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username' },
        })
        .lean()
        .exec();

    if (!place) {
        throw new Error('404 Not Found');
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

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    validateFields(placeData);

    const destination = await getDestinationAndCheckOwnership(destinationId, user._id);

    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country.name,
        imageUrls: [],
        comments: [],
        ownerId: user._id,
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
    try {
        const user = await User.findById(ownerId).select('username').lean().exec();

        if (!user) {
            throw new Error('User does not exist!');
        }

        const place = await Place.findById(placeId).select('comments').exec();

        if (!place) {
            throw new Error('Place not found');
        }

        const comment = new Comment({
            title: title.trim(),
            content: content.trim(),
            ownerId,
        });

        place.comments.push(comment);

        await Promise.all([comment.save(), place.save()]);

        return {
            ...comment.toObject(),
            ownerId: {
                _id: user._id,
                username: user.username,
            },
        };
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    addNewPlace,
    getPlaceById,
    getDestinationPlaces,
    addCommentToPlace,
};
