const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { createValidationError } = require('../../utils/createValidationError');

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

module.exports = addCommentToPlace;