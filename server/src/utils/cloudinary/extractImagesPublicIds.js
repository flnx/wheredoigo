function extractAllPublicIds(destination, places) {
    const destPublicIds = destination.imageUrls.map(
        ({ public_id }) => public_id
    );

    const placesPublicIds = places.flatMap((x) => {
        const ids = x.imageUrls.map(({ public_id }) => public_id);
        return ids;
    });

    return destPublicIds.concat(placesPublicIds);
}

module.exports = extractAllPublicIds;
