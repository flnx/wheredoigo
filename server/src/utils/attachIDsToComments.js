const { createValidationError } = require('./createValidationError');
const { errorMessages } = require('../constants/errorMessages');

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
        throw createValidationError(errorMessages.serverError, 500);
    }

    return commentsData;
}

module.exports = {
    attachIDsToComments,
};
