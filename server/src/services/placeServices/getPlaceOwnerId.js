const Place = require('../../models/placeSchema');

async function getPlaceOwnerIdOnly(placeId) {
    return Place.findById(placeId)
        .select('ownerId name city country rating')
        .lean()
        .exec();
}

module.exports = getPlaceOwnerIdOnly;
