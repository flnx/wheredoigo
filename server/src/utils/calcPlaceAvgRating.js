function calcAverageRating(placeRating, commentRating, newNumOfRates) {
    let { numRates, sumOfRates } = placeRating;

    if (commentRating > 0) {
        sumOfRates = sumOfRates + Number(commentRating);
        numRates = newNumOfRates ? numRates + Number(newNumOfRates) : numRates + 1;
    }

    const result = +(sumOfRates / numRates).toFixed(2);

    return result;
}

module.exports = {
    calcAverageRating,
};
