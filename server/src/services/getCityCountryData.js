const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('../utils/createValidationError');

require('dotenv').config();

async function fetchCountriesAndCities() {
    try {
        const result = await fetch(process.env.CITIES_COUNTRIES_URL);
        const countries = await result.json();

        if (countries?.error) {
            const msg = countries?.msg || errorMessages.request.server;
            throw createValidationError(msg, 500);
        }

        return countries;
    } catch (error) {
        throw error;
    }
}

async function fetchACountryAndItsCities(country) {
    try {
        const result = await fetch(process.env.GET_COUNTRY_CITIES_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'Application/Json',
            },
            body: JSON.stringify({ country }),
        });

        const countryData = await result.json();

        if (countryData.error) {
            const msg = countries?.msg || errorMessages.request.server;
            throw createValidationError(msg, 500);
        }

        const cities = countryData?.data ?? [];

        if (cities.length == 0) {
            throw createValidationError(error.request.server, 500);
        }

        return cities;
    } catch (error) {
        throw error;
    }
}

// function options() {
//     return {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Api-Key': process.env.X_API_NINJAS_KEY,
//         },
//     };
// }

module.exports = {
    fetchCountriesAndCities,
    fetchACountryAndItsCities,
};
