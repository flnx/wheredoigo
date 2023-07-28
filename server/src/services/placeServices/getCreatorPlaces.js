const Place = require('../../models/placeSchema');
const capitalizeEachWord = require('../../utils/capitalizeWords');

async function getCreatorPlaces({ ownerId }) {
    const places = await Place.find({ ownerId: ownerId })
        .select('-_id name comments')
        .populate({
            path: 'comments',
            select: '-_id rating',
        })
        .lean()
        .exec();

    const updatedData = places.map((place) => {
        const { name, comments } = place;

        let ratingData = [];

        if (comments.length > 0) {
            // Initialize an array to store the vote counts for each rating
            const votes = [0, 0, 0, 0, 0];

            comments.forEach((comment) => {
                const rating = comment.rating;
                // Increment the vote count for the corresponding rating
                votes[rating - 1]++;
            });

            ratingData = votes.map((count, index) => ({
                rating: `${index + 1} ${index == 0 ? 'star' : 'stars'} `, // add the labels
                totalVotes: count, // count how many votes has each label
            }));
        }

        return {
            name: capitalizeEachWord(name),
            data: ratingData,
        };
    });

    return updatedData;
}

module.exports = getCreatorPlaces;
