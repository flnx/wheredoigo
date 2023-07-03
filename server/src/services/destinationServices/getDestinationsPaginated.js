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
    // We need this to calculate underneath "hasNextPage / nextPage"
    // ... then we return the "next page" (if any) to the client so they can work around their pagination
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

    const countPromise = Destination.aggregate(countPipeline).exec();
    const dataPromise = Destination.aggregate(dataPipeline).exec();
     
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
