const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Destination = require('../models/destinationSchema');

const { fixInvalidFolderNameChars } = require('../utils/utils');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
const { imagesOptions } = require('../config/cloudinary');
const { validateFields } = require('../utils/validateFields');

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
    let error = null;

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };


    validateFields(placeData)

    const destination = await Destination.findById(destinationId)
        .select('city country ownerId')
        .populate('country')
        .lean()
        .exec();

    if (!destination) {
        error = new Error('Please enter a valid destination ID');
        error.status = 400;
        throw error;
    }

    if (!destination.ownerId.equals(user._id)) {
        error = new Error('Access Denied!');
        error.status = 403;
        throw error;
    }


    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country.name,
        imageUrls: [],
        comments: [],
        ownerId: user._id,
    });

    const imageUrls = [];
    let imgError = null;

    try {
        const folder_type = 'places';
        const folder_name = fixInvalidFolderNameChars(place.name, place._id);

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
