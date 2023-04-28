const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('../utils/createValidationError');
const { getPlaceById } = require('../services/placeService');
const capitalizeEachWord = require('../utils/capitalizeWords');

async function fetchPlaceAndCheckOwnership(req, res, next) {
    const { id } = req.params;
    const user = req.user;

    try {
        const place = await getPlaceById(id, user);

        if (!place.isOwner) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        req.place = place;

        next();
    } catch (error) {
        next(error);
    }
}

// async function checkPlaceOwnershipOnly(req, res, next) {
//     try {
//         const { id } = req.params;
//         const { ownerId } = req.user;
//         const destination = await getDestinationOwnerIdOnly(id);

//         if (!destination) {
//             throw createValidationError(errorMessages.notFound, 404);
//         }

//         if (!destination.ownerId.equals(ownerId || '')) {
//             throw createValidationError(errorMessages.accessDenied, 403);
//         }

//         req.destination = {
//             ...destination,
//             city: capitalizeEachWord(destination.city),
//             country: capitalizeEachWord(destination.country.name),
//         };

//         next();
//     } catch (error) {
//         next(error);
//     }
// }

module.exports = {
    fetchPlaceAndCheckOwnership,
    // checkPlaceOwnershipOnly,
};
