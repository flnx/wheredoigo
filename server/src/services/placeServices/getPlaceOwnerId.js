const Place = require('../../models/placeSchema');

async function getPlaceOwnerIdOnly(placeId) {
    return Place.findById(placeId).select('ownerId').lean().exec();
}

module.exports = getPlaceOwnerIdOnly;
