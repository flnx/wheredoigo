const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { isString, isValidInteger } = require('../../utils/utils');

async function addCommentToPlace({ id, title, content, ownerId, rating }) {
    validateFields({ content, title, rating });

    const user = await User.findById(ownerId).select('username avatarUrl').exec();

    if (!user) {
        throw createValidationError(errorMessages.unauthorized, 401);
    }

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        placeId: id,
        rating,
        ownerId,
    });

    const numRate = rating > 0 ? 1 : 0;

    const place = await Place.findOneAndUpdate(
        { _id: id, commentedBy: { $ne: ownerId } },
        {
            $push: {
                comments: comment._id,
                commentedBy: ownerId,
            },
            $inc: { 'rating.numRates': numRate, 'rating.sumOfRates': rating },
        },
        { new: true }
    )
        .select('rating')
        .lean();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    await comment.save();
    const avg = calcAverageRating(place.rating, rating);

    return {
        title: comment.title,
        content: comment.content,
        rating: comment.rating,
        _id: comment._id,
        time: comment.time,
        ownerId: {
            avatarUrl: user.avatarUrl,
            username: user.capitalizedUsername,
        },
        isOwner: true,
        avg,
    };
}

function validateFields({ content, title, rating }) {
    if (!isString(content) || content.length < 10) {
        throw createValidationError(errorMessages.invalidComment, 400);
    }

    if (!isString(title) || title.length < 2) {
        throw createValidationError(errorMessages.commentTitle, 400);
    }

    if (!isValidInteger(rating) || rating < 0 || rating > 5) {
        throw createValidationError(400, errorMessages.invalidRating);
    }
}

module.exports = addCommentToPlace;

// add comment

function calcAverageRating(placeRating, commentRating) {
    let { numRates, sumOfRates } = placeRating;

    if (commentRating > 0) {
        sumOfRates = sumOfRates + commentRating;
        numRates = numRates + 1;
    }

    const result = +(sumOfRates / numRates).toFixed(2);

    return result;
}

module.exports = addCommentToPlace;

// add comment
