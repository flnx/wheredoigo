const validator = require('validator');

// Utils
const { isString } = require('../../utils/utils');
const { createValidationError } = require('../../utils/createValidationError');
const { validateDescription, validateCategories, validateDestinationDetails } = require('../../utils/validateFields');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

// Services
const { fetchACountryAndItsCities } = require('../../services/getCityCountryData');

async function validateCreateDestinationData(req, res, next) {
    try {
        const data = req.body;

        const updated = {
            city: data.city,
            country: data.country,
            description: data.description,
            details: JSON.parse(data.details) || [],
            category: JSON.parse(data.category),
        };

        const { city, country, description, category, details } = updated;

        // City validation
        if (!isString(city)) {
            throw createValidationError(errorMessages.form.string('City'), 400);
        }

        if (!validator.isLength(city.trim(), { min: 1, max: 85 })) {
            throw createValidationError(errorMessages.data.city, 400);
        }

        // Country validation
        if (!isString(country)) {
            throw createValidationError(errorMessages.form.string('Country'), 400);
        }

        if (!validator.isLength(country.trim(), { min: 4, max: 56 })) {
            throw createValidationError(errorMessages.data.country, 400);
        }

        // Description validation
        const validatedDescription = validateDescription(description);

        // Categories validation
        const validatedCategories = validateCategories(category);

        if (validatedCategories.length == 0) {
            throw createValidationError(errorMessages.data.category, 400);
        }

        // Details validation
        validateDestinationDetails(details);

        // City exists within the given country
        await validateCountryAndCity(country, city);

        req.destination = {
            ...updated,
            description: validatedDescription,
            category: validatedCategories,
        };

        next();
    } catch (err) {
        next(err);
    }
}

async function validateCountryAndCity(countryStr, cityStr) {
    // fetches the country and its cities
    const countryData = await fetchACountryAndItsCities(countryStr);

    // finds the city provided by the client
    const city = countryData.find(
        (c) => c.toLowerCase() === cityStr.toLowerCase()
    );

    // if the city is not found in the provided country cities array, it throws
    if (!city) {
        throw createValidationError(errorMessages.data.city, 400);
    }
}

module.exports = {
    validateCreateDestinationData,
};
