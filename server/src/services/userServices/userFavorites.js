const Destination = require('../../models/destinationSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function userFavorites(ownerId) {
    const destinations = await Destination.find({
        likes: { $elemMatch: { $eq: ownerId } },
    })
        .select({
            imageUrls: { $slice: 1 },
            country: 1,
            city: 1,
        })
        .populate('country')
        .lean()
        .exec();

    destinations.forEach((x) => {
        const { country, imageUrls } = x;

        x.country = capitalizeEachWord(country.name);
        x.city = capitalizeEachWord(x.city);
        x.imageUrls = imageUrls[0]?.imageUrl;
    });

    return destinations;
}

module.exports = userFavorites;
