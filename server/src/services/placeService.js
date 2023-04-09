const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');

const Destination = require('../models/destinationSchema');
const { handleImageUploads } = require('../utils/cloudinaryUploader');

async function getPlaceById(placeId) {
    const place = await Place.findById(placeId).lean().exec();

    if (!place) {
        throw new Error('404 Not Found');
    }

    return place;
}

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .populate('comments')
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
        const cloudinaryImagesData = await handleImageUploads(images);

        for (const imageData of cloudinaryImagesData) {
            if (imageData.url) {
                imageUrls.push(imageData.url);
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
        const place = await Place.findById(placeId).select('comments').exec();

        if (!place) {
            throw new Error('Place not found');
        }

        const comment = new Comment({
            title: title.trim(),
            content: content.trim(),
            ownerId: ownerId,
        });

        place.comments.push(comment);

        await Promise.all([comment.save(), place.save()]);

        return comment;
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
