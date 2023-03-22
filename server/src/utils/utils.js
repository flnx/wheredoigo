function cityCountryRegex() {
    return /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
}

function validatePassword(password) {
    const regex = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=[\w\d#?!@$%^&*-_]).{8,}$/;

    return regex.test(password)
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
    validatePassword
};

// username: /^[a-zA-Z0-9_-]{2,25}$/,