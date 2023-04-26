const { getById } = require('../services/destinationService');
const { errorMessages } = require('../constants/errorMessages');
const { getDestinationPlaces } = require('../services/placeService');
const { createValidationError } = require('../utils/createValidationError');

async function checkDestinationOwnership(req, res, next) {
    const { id } = req.params;
    const user = req.user;

    try {
        const promises = [getById(id, user), getDestinationPlaces(id)]
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

module.exports = {
    checkDestinationOwnership,
};
