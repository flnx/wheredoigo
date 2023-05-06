const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');
const { isString, isValidInteger } = require('../../utils/utils');

async function addCommentToPlace({ id, title, content, ownerId, rating }) {
    if (!isString(content) || content.length < 10) {
        throw createValidationError(errorMessages.invalidComment, 400);
    }

    if (!isString(title) || title.length < 2) {
        throw createValidationError(errorMessages.commentTitle, 400);
    }

    if (!isValidInteger(rating) || rating < 0 || rating > 5) {
        throw createValidationError(400, errorMessages.invalidRating);
    }

    const place = await Place.findById(id).select('comments').exec();

    if (!place) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    const user = await User.findById(ownerId).select('username avatarUrl').exec();

    if (!user) {
        throw createValidationError(errorMessages.unauthorized, 401);
    }

    const comment = new Comment({
        title: title.trim(),
        content: content.trim(),
        rating,
        ownerId,
    });

    await comment.save();
    place.comments.push(comment);
    await place.save();

    return true;
}

module.exports = addCommentToPlace;
