function calcAverageRating(placeRating, commentRating, newNumOfRates) {
    try {
        let { numRates, sumOfRates } = placeRating;

        if (commentRating > 0) {
            // Add the commentRating to the sumOfRates
            sumOfRates += Number(commentRating);

            // Increment the numRates based on newNumOfRates value or by 1
            numRates += newNumOfRates ? Number(newNumOfRates) : 1;
        }

        // Calculate the avg rating with two decimal places
        const result = +(sumOfRates / numRates).toFixed(2);

        // Check if the result is NaN, if so return 0
        return isNaN(result) ? 0 : result;
    } catch (err) {
        console.error(`calcAverageRating - ${err.message}`);
        return 0;
    }
}
module.exports = {
    calcAverageRating,
};
