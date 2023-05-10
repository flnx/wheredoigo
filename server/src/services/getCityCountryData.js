const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('../utils/createValidationError');

require('dotenv').config();

async function fetchCity(city) {
    const result = await fetch(process.env.CITY_URL + city, options());
    const data = await result.json();

    if (!Array.isArray(data) || !data[0].name) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    return data;
}

async function fetchCountry(country) {
    const result = await fetch(process.env.COUNTRY_URL + country, options());
    const data = await result.json();

    return data;
}

function options() {
    return {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.X_API_KEY,
        },
    };
}

module.exports = {
    fetchCity,
    fetchCountry,
};
