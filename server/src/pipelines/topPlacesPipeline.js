function filteredAndSortedPlacesPipeline(categories) {
    // Match stage to filter documents
    const matchStage = {
        $match: {
            type: { $in: categories },
            country: { $in: ['netherlands', 'bulgaria', 'germany', 'hungary'] },
            'rating.numRates': { $ne: 0 },
        },
    };

    // AddFields stage to calculate averageRating
    const addFieldsStage = {
        $addFields: {
            averageRating: {
                $cond: {
                    if: { $eq: ['$rating.numRates', 0] },
                    then: 0,
                    else: {
                        $divide: ['$rating.sumOfRates', '$rating.numRates'],
                    },
                },
            },
        },
    };

    // Sort stage to sort by averageRating from high to low (descending order)
    const sortStage = {
        $sort: { averageRating: -1 },
    };

    // Group stage to group documents by country and create topPlaces array
    const groupStage = {
        $group: {
            _id: '$country',
            topPlaces: { $push: '$$ROOT' },
        },
    };

    // Project stage to limit the topPlaces array to 3 elements
    const projectStage = {
        $project: {
            topPlaces: { $slice: ['$topPlaces', 3] },
        },
    };

    // Unwind stage to flatten the topPlaces array
    const unwindStage = {
        $unwind: '$topPlaces',
    };

    // ReplaceRoot stage to promote the topPlaces documents to the top level
    const replaceRootStage = {
        $replaceRoot: { newRoot: '$topPlaces' },
    };

    // Project stage to shape the output documents with chosen fields
    const finalProjectStage = {
        $project: {
            _id: 1,
            type: 1,
            averageRating: 1,
            name: '$name',
            city: '$city',
            country: '$country',
            imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] },
        },
    };

    return [
        matchStage,
        addFieldsStage,
        sortStage,
        groupStage,
        projectStage,
        unwindStage,
        replaceRootStage,
        finalProjectStage,
    ];
}

module.exports = filteredAndSortedPlacesPipeline;
