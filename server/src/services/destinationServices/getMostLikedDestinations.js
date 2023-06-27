const Destination = require('../../models/destinationSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getMostLikedDestinations() {
    const destinations = await Destination.aggregate([
        { $match: { $expr: { $gt: [{ $size: '$likes' }, 0] } } }, // at least 1 like match
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
                likesCount: { $size: '$likes' }, // count the total destination likes
                likes: { $slice: ['$likesData', -3] }, // get the last 3 user likes
                imageUrls: { $arrayElemAt: ['$imageUrls.imageUrl', 0] }, // extract the main img url
            },
        },
        { $sort: { likesCount: -1 } }, // sort from high to low
        { $limit: 12 },
    ]).exec();

    const updatedDestinations = destinations.map((destination) => {
        const { _id, city, country, imageUrls, likes, likesCount } = destination;

        return {
            _id,
            likesCount,
            imageUrls,
            city: capitalizeEachWord(city),
            country: capitalizeEachWord(country.name),
            lastUserLikes: likes.map((user) => ({
                username: user.username,
                avatarUrl: user.avatarUrl,
            })),
        };
    });

    return updatedDestinations;
}

module.exports = getMostLikedDestinations;
