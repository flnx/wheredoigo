const Place = require('../../models/placeSchema');

async function getPlaceCommenters(placeId) {
    return Place.findById(placeId)
        .select('ownerId name city country rating commentedBy')
        .exec();
}

module.exports = getPlaceCommenters;
