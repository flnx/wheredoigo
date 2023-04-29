const Place = require('../../models/placeSchema');

async function getPlaceOwnerIdOnly(placeId) {
    return Place.findById(placeId).select('ownerId name').lean().exec();
}

module.exports = getPlaceOwnerIdOnly;