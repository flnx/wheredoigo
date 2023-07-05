const Destination = require('../../models/destinationSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getMostLikedDestinations() {
    const destinations = await Destination.find({ likes: { $gt: [] } })
        .sort({ likesCount: -1 })
        .select({
            city: 1,
            country: 1,
            likesCount: 1,
            imageUrls: { $slice: 1 }, // get the main img (img on index 0)
            likes: { $slice: -3 }, // slice the last 3 likes
        })
        .populate([
            { path: 'country', select: 'name -_id' },
            { path: 'likes', select: 'username avatarUrl -_id' },
        ])
        .limit(12)
        .exec();


    const updatedDestinations = destinations.map((destination) => {
        const { _id, city, country, imageUrls, likes, likesCount } = destination;

        return {
            _id,
            likesCount,
            imageUrls: imageUrls[0]?.imageUrl,
            city: capitalizeEachWord(city),
            country: capitalizeEachWord(country.name),
            lastUserLikes: likes,
        };
    });

    return updatedDestinations;
}

module.exports = getMostLikedDestinations;
