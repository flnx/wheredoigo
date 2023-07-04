function deleteImageQuery(destinationOrPlaceId, img_id) {
    return (
        {
            _id: destinationOrPlaceId,
            'imageUrls._id': img_id,
        },
        {
            $pull: {
                imageUrls: { _id: img_id },
            },
        },
        {
            projection: { 'imageUrls.$': 1 },
        }
    );
}

module.exports = deleteImageQuery;