const { isValidArrayOfStrings } = require('../../utils/utils');

const { openai } = require('../../config/openAIConfig');
const { createValidationError } = require('../../utils/createValidationError');

async function fetchAIComments(city, place, country, num) {
    validateInput([city, place, country]);

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            temperature: 0.5,
            messages: [
                {
                    role: 'user',
                    content: `Generate ${num} human like short comment reviews 1-5 rating (JSON) array of objects - for ${place} - ${city}, ${country}. Example: [{ title: "Amazing place", content: "here example content", rating: 3 }, ...] EXACT OBJECT STRUCTURE!`,
                },
            ],
        });

        const { content } = response.data.choices[0].message;
        const commentsData = JSON.parse(content);

        return commentsData;
    } catch (err) {
        const errMsg = err?.response?.data?.error?.message || err.message;
        throw createValidationError(errMsg, 400);
    }
}
function validateInput(arrayOfStrings) {
    // Strings validation
    const isDataValid = isValidArrayOfStrings(arrayOfStrings);

    if (!isDataValid) {
        throw createValidationError('fetchAIComments(): Input must be an array of strings', 400);
    }

    // Filter out empty strings
    const filterOutEmptyStrings = arrayOfStrings.filter(Boolean);

    // if it doesnt contain 3 string (cityName, placeName, countryName) - return false
    if (filterOutEmptyStrings.length !== 3) {
        throw createValidationError(
            'cityName, placeName and countryName are required',
            400
        );
    }

    return true;
}

module.exports = {
    fetchAIComments,
};
