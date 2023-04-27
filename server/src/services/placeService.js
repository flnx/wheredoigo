const mongoose = require('mongoose');
const { isValid } = mongoose.Types.ObjectId;

const Place = require('../models/placeSchema');
const Comment = require('../models/commentSchema');
const User = require('../models/userSchema');

const capitalizeEachWord = require('../utils/capitalizeWords');
const { addImages, deleteMultipleImages } = require('../utils/cloudinaryUploader');
const { validateFields } = require('../utils/validateFields');
const { createValidationError } = require('../utils/createValidationError');
const { errorMessages } = require('../constants/errorMessages');
const { extractCloudinaryFolderName } = require('../utils/utils');

async function getPlaceById(placeId, user) {
    const place = await Place.findById(placeId)
        .select('-ownerId')
        .populate({
            path: 'comments',
            populate: { path: 'ownerId', select: 'username avatarUrl' },
        })
        .lean()
        .exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // 1. Adds isOwner prop if the current user (if any) is the owner of the comment
    // 2. Removes ownerId._id prop (the original owner id) before sending it to the client
    place.comments.forEach((comment) => {
        const { _id, ...ownerData } = comment.ownerId;

        if (user && _id.equals(user.ownerId)) {
            comment.isOwner = true;
        }

        comment.ownerId = {
            ...ownerData,
            username: capitalizeEachWord(ownerData.username),
        };
    });

    place.name = capitalizeEachWord(place.name);
    place.city = capitalizeEachWord(place.city);
    place.isAuth = user ? true : false;

    const { imageUrls, ...placeData } = place;
    const updatedImgUrls = imageUrls.map(({ public_id, ...rest }) => rest);

    return {
        ...placeData,
        imageUrls: updatedImgUrls,
    };
}

async function getDestinationPlaces(destinationId) {
    const places = await Place.find({ destinationId })
        .select({
            name: 1,
            city: 1,
            type: 1,
            imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] },
        })
        .lean()
        .exec();

    places.forEach((x) => {
        x.name = capitalizeEachWord(x.name);
        x.city = capitalizeEachWord(x.name);
    });

    return places;
}

async function addNewPlace(data, images, destination, ownerId) {
    const { destinationId, name, description, type } = data;

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
        country: destination.country,
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
    const user = await User.findById(ownerId).select('username avatarUrl').exec();

    if (!user) {
        throw createValidationError(errorMessages.unauthorized, 401);
    }

    const place = await Place.findById(placeId).select('comments').exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
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

    return {
        title: comment.title,
        content: comment.content,
        _id: comment._id,
        time: comment.time,
        ownerId: {
            avatarUrl: user.avatarUrl,
            username: user.capitalizedUsername,
        },
        isOwner: true,
    };
}

async function deleteCommentFromPlace(placeId, commentId, ownerId) {
    if (!commentId || !isValid(commentId)) {
        throw createValidationError(`Place ${errorMessages.notFound}`, 404);
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const comment = await Comment.findById(commentId);

        if (!comment) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (!comment.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const place = await Place.findOneAndUpdate(
            { _id: placeId, comments: commentId },
            {
                $pull: {
                    comments: commentId,
                },
            },
            { session }
        );

        if (!place) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        await Comment.findByIdAndDelete(commentId, { session });
        await session.commitTransaction();

        return true;
    } catch (err) {
        await session.abortTransaction();
        throw err;
    } finally {
        session.endSession();
    }
}

async function deletePlace(placeId, userId) {
    const place = await Place.findById(placeId).lean().exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!place.ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    const comments_ids = place.comments.map((c) => c.toString());

    // get correct cloudinary folder name
    const path = 'places';
    let { name } = place;
    const folderName = extractCloudinaryFolderName(path, name, placeId);

    // extract all cloudinary public ids for the specific place
    const image_ids = place.imageUrls.map(({ public_id, ...rest }) => public_id);

    await Place.findByIdAndDelete(placeId);

    await Promise.allSettled([
        Comment.deleteMany({ _id: { $in: comments_ids } }),
        deleteMultipleImages(image_ids, [folderName]),
    ]);

    return true;
}


module.exports = {
    addNewPlace,
    getPlaceById,
    getDestinationPlaces,
    addCommentToPlace,
    deleteCommentFromPlace,
    deletePlace,
};
