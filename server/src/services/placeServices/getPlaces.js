const Place = require('../../models/placeSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getPlaces() {
    const pipeline = createPipeline();
    const places = await Place.aggregate(pipeline);

    const updatedPlaces = places.map((place) => ({
        ...place,
        name: capitalizeEachWord(place.name),
        city: capitalizeEachWord(place.city),
        country: capitalizeEachWord(place.country),
    }));

    console.log(updatedPlaces);

    return updatedPlaces;
}

function createPipeline() {
    return [
        // Match stage to filter documents
        {
            $match: {
                type: { $in: ['Explore', 'Fun'] },
                country: { $in: ['netherlands', 'bulgaria', 'germany'] },
                'rating.numRates': { $ne: 0 },
            },
        },
        // AddFields stage to calculate averageRating
        {
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
        },
        // Sort stage to sort by averageRating from high to low (descending order)
        {
            $sort: { averageRating: -1 },
        },
        // Group stage to group documents by country and create topPlaces array
        {
            $group: {
                _id: '$country',
                topPlaces: { $push: '$$ROOT' },
            },
        },
        // Project stage to limit the topPlaces array to 3 elements
        {
            $project: {
                topPlaces: { $slice: ['$topPlaces', 3] },
            },
        },
        // Unwind stage to flatten the topPlaces array
        {
            $unwind: '$topPlaces',
        },
        // ReplaceRoot stage to promote the topPlaces documents to the top level
        {
            $replaceRoot: { newRoot: '$topPlaces' },
        },
        // Project stage to shape the output documents with chosen fields
        {
            $project: {
                _id: 1,
                type: 1,
                averageRating: 1,
                name: '$name',
                city: '$city',
                country: '$country',
                imageUrl: { $arrayElemAt: ['$imageUrls.imageUrl', 0] },
            },
        },
    ];
}
module.exports = getPlaces;
