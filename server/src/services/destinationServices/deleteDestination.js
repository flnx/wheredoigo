const Destination = require('../../models/destinationSchema');
const Place = require('../../models/placeSchema');
const Comment = require('../../models/commentSchema');
const { errorMessages } = require('../../constants/errorMessages');

// utils
const { deleteMultipleImages } = require('../../utils/cloudinaryUploader');
const { extractCloudinaryFolderName } = require('../../utils/utils');
const { createValidationError } = require('../../utils/createValidationError');

async function deleteDestination(destinationId, userId) {
    const [destination, places] = await Promise.all([
        Destination.findById(destinationId).lean().exec(),
        Place.find({ destinationId }).lean().exec(),
    ]);

    if (!destination) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    if (!destination.ownerId.equals(userId)) {
        throw createValidationError(errorMessages.accessDenied, 403);
    }

    const public_ids = extractAllPublicIds();
    const folderNames = extractFolderNames();

    const comments_ids = places.flatMap((p) => p.comments.map((c) => c.toString()));

    const promises = [
        Destination.findByIdAndDelete(destinationId),
        Place.deleteMany({ destinationId }),
        deleteMultipleImages(public_ids, folderNames),
        Comment.deleteMany({ _id: { $in: comments_ids } }),
    ];

    await Promise.all(promises);

    return true;

    function extractAllPublicIds() {
        const destPublicIds = destination.imageUrls.map(
            ({ public_id, ...rest }) => public_id
        );

        const placesPublicIds = places.flatMap((x) => {
            const ids = x.imageUrls.map(({ public_id, ...rest }) => public_id);
            return ids;
        });

        return destPublicIds.concat(placesPublicIds);
    }

    function extractFolderNames() {
        const d_path = 'destinations';
        const { city } = destination;
        const destFolderName = extractCloudinaryFolderName(
            d_path,
            city,
            destinationId
        );

        const p_path = 'places';

        const placesFolderNames = places.map((place) => {
            let { city, _id } = place;
            _id = _id.toString();

            const placeFolderName = extractCloudinaryFolderName(p_path, city, _id);
            return placeFolderName;
        });

        return [destFolderName, ...placesFolderNames];
    }
}

module.exports = deleteDestination;
