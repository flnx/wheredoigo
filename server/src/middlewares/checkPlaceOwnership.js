const getPlaceById = require('../services/placeServices/getPlaceById');
const { errorMessages } = require('../constants/errorMessages');

// utils
const { createValidationError } = require('../utils/createValidationError');

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

module.exports = {
    fetchPlaceAndCheckOwnership,
};
