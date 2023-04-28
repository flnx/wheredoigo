const getDestinationById = require('../services/destinationServices/getDestinationById');
const getDestinationOwnerIdOnly = require('../services/destinationServices/getDestinationOwnerId');
const { getDestinationPlaces } = require('../services/placeService');

const { errorMessages } = require('../constants/errorMessages');

// utils
const { createValidationError } = require('../utils/createValidationError');
const capitalizeEachWord = require('../utils/capitalizeWords');

async function fetchDestinationAndCheckOwnership(req, res, next) {
    const { id } = req.params;
    const user = req.user;

    try {
        const promises = [
            getDestinationById(id, user), 
            getDestinationPlaces(id)
        ];
        
        const [destination, places] = await Promise.all(promises);

        if (!destination.isOwner) {
            throw createValidationError(errorMessages.accessDenied, 403);
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
        const { ownerId } = req.user;
        const destination = await getDestinationOwnerIdOnly(id);

        if (!destination) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        if (!destination.ownerId.equals(ownerId || '')) {
            throw createValidationError(errorMessages.accessDenied, 403);
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
