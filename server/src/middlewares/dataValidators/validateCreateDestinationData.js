// Utils
const { createValidationError } = require('../../utils/createValidationError');
const { sanitizeHtmlString } = require('../../utils/validators/sanitizeHtmlString');

// Constants
const { errorMessages } = require('../../constants/errorMessages');

// Services
const { fetchACountryAndItsCities } = require('../../services/getCityCountryData');

const validateCreateDestinationData = (yupSchema) => async (req, res, next) => {
    try {
        const body = req.body;
        const data = {
            city: req.body.city,
            country: body.country,
            description: body.description,
            details: body.details,
            category: body.category,
        };

        const { city, country, description, details } = data;

        // Validate props
        await yupSchema.validate(data);

        // Sanitize description
        const sanitizedDescription = sanitizeHtmlString(description);

        // Sanitize details
        const sanitizedDetails = details.map((detail) => ({
            name: detail.name,
            content: sanitizeHtmlString(detail.content, 0, 2000),
        }));

        // City exists within the given country
        await validateCountryAndCity(country, city);

        req.destination = {
            ...data,
            details: sanitizedDetails,
            description: sanitizedDescription,
        };

        next();
    } catch (err) {
        next(err);
    }
};

async function validateCountryAndCity(countryStr, cityStr) {
    // fetches the country and its cities
    const countryData = await fetchACountryAndItsCities(countryStr);

    // finds the city provided by the client
    const city = countryData.find((c) => c.toLowerCase() === cityStr.toLowerCase());

    // if the city is not found in the provided country cities array, it throws
    if (!city) {
        throw createValidationError(errorMessages.data.city, 400);
    }
}

module.exports = {
    validateCreateDestinationData,
};
