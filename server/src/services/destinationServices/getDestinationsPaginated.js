const Destination = require('../../models/destinationSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');
const { validateCategories } = require('../../utils/validateFields');

async function getDestinationsPaginated(page, limit, searchParams, categories) {
    let regex = new RegExp(searchParams, 'i');

    const filteredCategories = validateCategories(categories);

    const lookupStage = {
        $lookup: {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'country',
        },
    };

    const unwindStage = { $unwind: '$country' };

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
                $ifNull: [{ $arrayElemAt: ['$imageUrls.imageUrl', 0] }, ''],
            },
            city: 1,
        },
    };

    const skipStage = { $skip: page };
    const limitStage = { $limit: limit };

    // Pipeline for counting the total number of documents after applying filters
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

    // Execute the count pipeline and data pipeline in parallel
    const countPromise = Destination.aggregate(countPipeline).exec();
    const dataPromise = Destination.aggregate(dataPipeline).exec();

    // Wait for the count and data promises to resolve
    const [countResult, destinations] = await Promise.all([
        countPromise,
        dataPromise,
    ]);

    // Extract the total count from the count result
    const countAll = countResult[0] ? countResult[0].total : 0;

    // Capitalize the city and country name
    destinations.forEach((x) => {
        x.city = capitalizeEachWord(x.city);
        x.country = capitalizeEachWord(x.country.name);
    });

    // Calculate if there is a next page
    const hasNextPage = page + limit < countAll;

    // Calculate the next page number if it exists
    const nextPage = hasNextPage ? page + limit : null;

    // Return the paginated data and nextPage number
    return [destinations, nextPage];
}

module.exports = getDestinationsPaginated;
