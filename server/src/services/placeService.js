const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');
const Destination = require('../models/destinationSchema');

const { fixInvalidFolderNameChars } = require('../utils/utils');
const { handleImageUploads } = require('../utils/cloudinaryUploader');
const { imagesOptions } = require('../config/cloudinary');

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

async function addNewPlace(data, images) {
    const { destinationId, name, description, type } = data;

    const placeData = {
        destinationId,
        description,
        type,
        name,
    };

    const isFieldEmpty = Object.values(placeData).some((x) => !x);

    if (isFieldEmpty) {
        throw new Error('Missing Fields!');
    }

    const destination = await Destination.findById(destinationId)
        .select('city country')
        .populate('country')
        .lean()
        .exec();

    if (!destination) {
        throw new Error('Please enter a valid destination ID');
    }

    const place = await Place.create({
        ...placeData,
        city: destination.city,
        country: destination.country.name,
        imageUrls: [],
        comments: [],
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
