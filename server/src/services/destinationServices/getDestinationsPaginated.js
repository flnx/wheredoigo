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
                $ifNull: [{ $arrayElemAt: ['$imageUrls', 0] }, []],
            },
            city: 1,
        },
    };

    const skipStage = { $skip: page };
    const limitStage = { $limit: limit };

    const pipeline = [
        lookupStage,
        unwindStage,
        matchStage,
        projectStage,
        skipStage,
        limitStage,
    ];

    const destinations = await Destination.aggregate(pipeline).exec();

    destinations.forEach((x) => {
        x.city = capitalizeEachWord(x.city);
        x.country.name = capitalizeEachWord(x.country.name);
        delete x.imageUrls.public_id;
    });

    return destinations;
}

module.exports = getDestinationsPaginated;
