const Destination = require('../../models/destinationSchema');

async function getDestinationOwnerIdOnly(destinationId) {
    return Destination.findById(destinationId)
        .select('ownerId city country')
        .populate('country', 'name')
        .lean()
        .exec();
}

module.exports = getDestinationOwnerIdOnly;