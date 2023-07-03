const getPlaceById = require('../services/placeServices/getPlaceById');
const { errorMessages } = require('../constants/errorMessages');

const getPlaceOwnerIdOnly = require('../services/placeServices/getPlaceOwnerId');
const getPlaceCommenters = require('../services/placeServices/getPlaceCommenters');

// utils
const { createValidationError } = require('../utils/createValidationError');
const { getCommenters } = require('../services/userServices/getCommenters');

async function fetchPlaceAndCheckOwnership(req, res, next) {
    const { id } = req.params;
    const user = req.user;

    try {
        const place = await getPlaceById(id, user);

        // Allow admin role to bypass ownership check
        if (user.role !== 'admin' && !place.isOwner) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        req.place = place;

        next();
    } catch (error) {
        next(error);
    }
}

async function checkPlaceOwnershipOnly(req, res, next) {
    try {
        const { id } = req.params;
        const { ownerId, role } = req.user;

        const place = await getPlaceOwnerIdOnly(id);

        if (!place) {
            throw createValidationError('Place ' + errorMessages.notFound, 404);
        }

        // Allow admin role to bypass access check
        if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        req.place = place;

        next();
    } catch (error) {
        next(error);
    }
}

async function checkPlaceOwnershipAndCommenters(req, res, next) {
    try {
        const { id } = req.params;
        const { ownerId, role } = req.user;

        const promises = [getPlaceCommenters(id), getCommenters()];
        const [place, allComenters] = await Promise.all(promises);

        if (!place) {
            throw createValidationError('Place ' + errorMessages.notFound, 404);
        }

        // Allow admin role to bypass access check
        if (role !== 'admin' && !place.ownerId.equals(ownerId)) {
            throw createValidationError(errorMessages.accessDenied, 403);
        }

        const { commentedBy } = place;

        // Filters out the bots (commenters) who already commented that place
        const filteredCommenters = allComenters.filter(
            (c) => !commentedBy.includes(c._id)
        );

        if (filteredCommenters.length == 0) {
            throw createValidationError(errorMessages.unavailable, 503);
        }

        req.place = place;
        req.commenters = filteredCommenters;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    fetchPlaceAndCheckOwnership,
    checkPlaceOwnershipOnly,
    checkPlaceOwnershipAndCommenters,
};
