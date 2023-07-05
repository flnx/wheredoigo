function addImagesQuery(id, imageUrls) {
    const query = [
        { _id: id },
        {
            $push: {
                imageUrls: { $each: imageUrls },
                $slice: -imageUrls.length,
            },
        },
        {
            new: true,
            projection: {
                _id: 0,
                imageUrls: {
                    $slice: -imageUrls.length,
                },
            },
        },
    ];

    return query;
}

module.exports = addImagesQuery;