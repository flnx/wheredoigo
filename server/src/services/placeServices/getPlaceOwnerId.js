const Place = require('../../models/placeSchema');

async function getPlaceOwnerIdOnly(placeId) {
    return Place.findById(placeId).select('ownerId name city').lean().exec();
}

module.exports = getPlaceOwnerIdOnly;