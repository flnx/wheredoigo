function calcAverageRating(placeRating, commentRating) {
    let { numRates, sumOfRates } = placeRating;

    if (commentRating > 0) {
        sumOfRates = sumOfRates + commentRating;
        numRates = numRates + 1;
    }

    const result = +(sumOfRates / numRates).toFixed(2);

    return result;
}

module.exports = {
    calcAverageRating,
};
