const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('../utils/createValidationError');

require('dotenv').config();

async function fetchCity(city) {
    if (!city) {
        throw createValidationError(errorMessages.notFound, 404);
    }

    // const result = await fetch(process.env.CITY_URL + city + "&country=CH" + "&limit=5", options());
    const result = await fetch(process.env.CITY_URL + city + '&limit=10', options());
    const data = await result.json();

    if (Array.isArray(data)) {
        if (data.length == 0 || !data[0].name) {
            throw createValidationError(errorMessages.notFound, 404);
        }

        return data;
    }

    throw createValidationError(errorMessages.notFound, 404);
}

async function fetchCountriesAndCities() {
    try {
        const result = await fetch(process.env.CITIES_COUNTRIES_URL);
        const data = await result.json();
        return data;
    } catch(error) {
        throw createValidationError(errorMessages.serverError, 500);
    }

}

async function fetchCountry(country) {
    const result = await fetch(process.env.COUNTRY_URL + country, options());
    const data = await result.json();

    if (Array.isArray(data)) {
        if (data.length == 0 || !data[0].name) {
            throw createValidationError(`Country ${errorMessages.notFound}`, 404);
        }

        return {
            ...data[0],
        };
    }

    throw createValidationError(`Country ${errorMessages.notFound}`, 404);
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
    fetchCountriesAndCities
};
