const Destination = require('../../models/destinationSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getTopDestinations() {
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
            $lookup: {
                from: 'users',
                localField: 'likes',
                foreignField: '_id',
                as: 'likesData',
            },
        },
        {
            $project: {
                city: 1,
                country: 1,
                likes: { $slice: ['$likesData', -3] }, // get the last 3 user likes
                likesCount: { $size: '$likes' }, // count the total destination likes
                imageUrls: { $arrayElemAt: ['$imageUrls.imageUrl', 0] }, // extract the main img url
            },
        },
        { $sort: { likesCount: -1 } }, // sort from high to low
        { $limit: 1 },
    ]).exec();

    const updatedDestinations = destinations.map((destination) => {
        const { _id, city, country, imageUrls, likes, likesCount } = destination;

        return {
            _id,
            likesCount,
            city: capitalizeEachWord(city),
            country: capitalizeEachWord(country.name),
            imageUrls: imageUrls[0].imageUrl,
            lastUserLikes: likes
                .map((user) => ({
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                }))
                .reverse(),
        };
    });

    return updatedDestinations;
}

module.exports = getTopDestinations;

// with aggregation
