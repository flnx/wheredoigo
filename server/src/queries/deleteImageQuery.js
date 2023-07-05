function deleteImageQuery(destinationOrPlaceId, img_id) {
    const query = [
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
        },
    ];

    return query;
}

module.exports = deleteImageQuery;
