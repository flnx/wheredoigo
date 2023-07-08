const { createValidationError } = require('./createValidationError');
const { errorMessages } = require('../constants/errorMessages');
const { validateCommentFields } = require('./validateComment');

function attachIDsToComments({ comments, commenters, placeId }) {
    const commentsData = comments
        .map((comment, i) => {
            const ownerId = commenters[i]?._id;

            if (comment.rating && comment.title && comment.content && ownerId) {
                return {
                    ...comment,
                    placeId,
                    ownerId,
                };
            }
        })
        .filter(Boolean); // Filters out the undefined

    if (commentsData.length == 0) {
        console.error('AddAIGeneratedCommentsToPlace: GPT Object Error');
        throw createValidationError(errorMessages.request.server, 500);
    }

    return commentsData;
}

function validateMultipleCommentsData(comments) {
    if (!Array.isArray(comments)) {
        throw createValidationError(errorMessages.request.server, 500);
    }

    const commentsData = comments
        .map((comment) => {
            try {
                validateCommentFields(comment);
                return comment;
            } catch (err) {
                return null;
            }
        })
        .filter(Boolean); // Filters out the null's

    if (commentsData.length == 0) {
        throw createValidationError(errorMessages.request.server, 500);
    }

    return commentsData;
}

module.exports = {
    attachIDsToComments,
    validateMultipleCommentsData,
};
