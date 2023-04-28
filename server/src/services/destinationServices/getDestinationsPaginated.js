const Destination = require('../../models/destinationSchema');

async function getDestinationsPaginated(page, limit, searchParams) {
    let regex = new RegExp(searchParams, 'i');

    const destinations = await Destination.aggregate([
        {
            $lookup: {
                from: 'countries',
                localField: 'country',
                foreignField: '_id',
                as: 'country',
            },
        },
        { $unwind: '$country' },
        {
            $match: {
                $or: [
                    { city: { $regex: regex } },
                    { 'country.name': { $regex: regex } },
                ],
            },
        },
        {
            $project: {
                'country.name': 1,
                imageUrls: {
                    $ifNull: [{ $arrayElemAt: ['$imageUrls', 0] }, []],
                },
                city: 1,
            },
        },
        {
            $skip: page,
        },
        {
            $limit: limit,
        },
    ]).exec();

    destinations.forEach((item) => {
        delete item.imageUrls.public_id;
    });

    return destinations;
}

module.exports = getDestinationsPaginated;
