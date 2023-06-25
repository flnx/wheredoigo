const { errorMessages } = require('../constants/errorMessages');
const { createValidationError } = require('../utils/createValidationError');

require('dotenv').config();

async function fetchCountriesAndCities() {
    try {
        const result = await fetch(process.env.CITIES_COUNTRIES_URL);
        const countries = await result.json();

        if (countries?.error) {
            throw new Error(countries?.msg || errorMessages.serverError);
        }

        return countries;
    } catch (error) {
        throw createValidationError(error.message, 500);
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
            throw new Error(countryData.msg);
        }

        const cities = countryData?.data ?? [];

        if (cities.length == 0) {
            throw createValidationError(error.serverError, 500);
        }

        return cities;
    } catch (error) {
        throw createValidationError(error.message, 400);
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
