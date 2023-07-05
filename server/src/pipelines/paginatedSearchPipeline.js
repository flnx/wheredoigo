function paginatedSearchPipeline(filteredCategories, page, limit, regex) {
    const lookupStage = {
        $lookup: {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country',
        },
    };

    const unwindStage = { $unwind: '$country' };

    // Searches for matches in city/country fields
    const matchStage = {
        $match: {
            $or: [
                { city: { $regex: regex } },
                { 'country.name': { $regex: regex } },
            ],
        },
    };

    if (filteredCategories.length > 0) {
        matchStage.$match.category = { $in: filteredCategories };
    }

    const projectStage = {
        $project: {
            'country.name': 1,
            imageUrls: {
                $ifNull: [{ $arrayElemAt: ['$imageUrls.imageUrl', 0] }, ''], // returns the main image
            },
            city: 1,
        },
    };

    const skipStage = { $skip: page };
    const limitStage = { $limit: limit };

    // Pipeline for counting the total number of documents after applying filters
    // This is needed for "hasNextPage / nextPage" calculations
    const countPipeline = [
        lookupStage,
        unwindStage,
        matchStage,
        {
            $count: 'total',
        },
    ];

    // Pipeline for retrieving paginated data based on filters
    const dataPipeline = [
        lookupStage,
        unwindStage,
        matchStage,
        projectStage,
        skipStage,
        limitStage,
    ];

    return {
        countPipeline,
        dataPipeline,
    };
}

module.exports = paginatedSearchPipeline;
