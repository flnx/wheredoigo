const Place = require('../../models/placeSchema');
const User = require('../../models/userSchema');
const { errorMessages } = require('../../constants/errorMessages');
const { createValidationError } = require('../../utils/createValidationError');

async function getPlaceById(placeId, user) {
    const promises = [
        Place.findById(placeId).select('-commentedBy -comments').exec(),
        isCommentedByAIBots({ placeId }),
    ];

    const [place, hasAIComments] = await Promise.all(promises);

    if (!place) {
        throw createValidationError(errorMessages.data.notFound, 404);
    }

    // checks if the user already commented/rated the place
    let hasCommented = null;
    let isOwner = false;

    if (user) {
        hasCommented = await Place.exists({
            _id: placeId,
            commentedBy: { $in: [user.ownerId] },
        });

        isOwner = place.ownerId.equals(user.ownerId);
    }

    return {
        _id: place._id,
        destinationId: place.destinationId,
        type: place.type,
        name: place.capitalizedName,
        city: place.capitalizedCity,
        country: place.capitalizedCountry,
        description: place.description,
        imageUrls: place.imageUrls.map(({ _id, imageUrl }) => ({ _id, imageUrl })),
        isAuth: !!user,
        hasCommented: !!hasCommented,
        averageRating: place.averageRating,
        isOwner,
        hasAIComments,
    };
}

async function isCommentedByAIBots({ placeId }) {
    const promises = [
        Place.findById(placeId).select('commentedBy').lean().exec(),
        User.find({ role: 'commenter' }).select('_id').lean().exec(),
    ];

    const [place, commenters] = await Promise.all(promises);

    const commentedBy = place.commentedBy.map((id) => id.toString());

    const filteredCommenters = commenters.filter(
        (commenter) => !commentedBy.includes(commenter._id.toString())
    );

    return filteredCommenters.length == 0;
}

module.exports = getPlaceById;
