const getDestinationById = require('../services/destinationServices/getDestinationById');
const getDestinationOwnerIdOnly = require('../services/destinationServices/getDestinationOwnerId');
const getDestinationPlaces = require('../services/placeServices/getDestinationPlaces');
const { errorMessages } = require('../constants/errorMessages');

// utils
const capitalizeEachWord = require('../utils/capitalizeWords');
const { createValidationError } = require('../utils/createValidationError');

async function fetchDestinationAndCheckOwnership(req, res, next) {
    const { id } = req.params;
    const user = req.user;

    try {
        const promises = [
            getDestinationById(id, user), 
            getDestinationPlaces(id)
        ];

        const [destination, places] = await Promise.all(promises);

        // Allow admin role to bypass ownership check
        if (user.role !== 'admin' && !destination.isOwner) {
            throw createValidationError(errorMessages.auth.accessDenied, 403);
        }

        destination.places = places;
        req.destination = destination;

        next();
    } catch (error) {
        next(error);
    }
}

async function checkDestinationOwnershipOnly(req, res, next) {
    try {
        const { id } = req.params;
        const { ownerId, role } = req.user;
        const destination = await getDestinationOwnerIdOnly(id);

        if (!destination) {
            throw createValidationError(errorMessages.data.notFound, 404);
        }

        // Allow admin role to bypass ownership check
        if (role !== 'admin' && !destination.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.auth.accessDenied, 403);
        }

        req.destination = {
            ...destination,
            city: capitalizeEachWord(destination.city),
            country: capitalizeEachWord(destination.country.name),
        };

        next();
    } catch (error) {
        next(error);
    }
}
module.exports = {
    fetchDestinationAndCheckOwnership,
    checkDestinationOwnershipOnly,
};
