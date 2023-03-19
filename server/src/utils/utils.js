function cityCountryRegex() {
    return /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
}

function matchCityAndCountry(city = '', country = '') {
    const pattern = cityCountryRegex();

    const isCityValid = pattern.test(city);
    const isCountryValid = pattern.test(country);

    if (!isCityValid || !isCountryValid) {
        return false;
    }

    return true;
}

module.exports = {
    matchCityAndCountry,
    cityCountryRegex,
};
