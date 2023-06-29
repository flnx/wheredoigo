const { isValidArrayOfStrings } = require('../../utils/utils');

const { openai } = require('../../config/openAIConfig');
const { createValidationError } = require('../../utils/createValidationError');

async function generateAICommentsForCommentBots(cityName, placeName, countryName) {
    const isValidInput = validateInput([cityName, placeName, countryName]);

    if (!isValidInput) {
        return [];
    }

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            max_tokens: 500,
            messages: [
                {
                    temperature: 0.7,
                    role: 'user',
                    content: `${placeName} - ${cityName}, ${countryName}, generate 10 human like (1-5 rating) fake short comment reviews. Example comment inside quotes: '1) 'Insert comment here. |4 stars|' '`,
                },
            ],
        });


        console.log(response.data);
        // const commentsData = extractCommentsAndRating(response.data);
        // return commentsData;
    } catch (err) {
        const errMsg = err?.response?.data?.error?.message || err.message;
        console.log(errMsg);
        throw createValidationError(errMsg, 400);
    }
}

function extractCommentsAndRating(data) {
    const text = data.choices[0].message.content;
    const comments = text.split(/\n\n|\n/);

    // Regex pattern to match the quotes (the comment is inside quotes)
    const commentRegex = /(['"])(.*?)\1/;

    const commentsData = [];

    for (let str of comments) {
        const match = str.match(commentRegex);

        if (match && match[2]) {
            let contentStr = match[2];

            // Separate the rating from the comment
            const [content, rating] = processCommentAndRating(contentStr);

            commentsData.push({
                content,
                rating,
            });
        }
    }

    return commentsData;
}

function processCommentAndRating(text) {
    if (typeof text !== 'string') {
        return false;
    }
    // Split the string into an array of sentences and removes the empty values
    let sentences = text.split(/[.?!]/).filter(Boolean);

    // Remove the last sentence rating and match the rating number
    const lastSentence = sentences.pop();
    const ratingMatch = lastSentence.match(/\d+/);

    // Default rating fallback in case no match occurs
    let defaultRating = Math.floor(Math.random() * 5) + 1; // default rating from 1 to 5

    if (ratingMatch && ratingMatch[0]) {
        defaultRating = parseInt(ratingMatch[0]);
    }

    // Join the remaining sentences back into a string
    const updatedText = sentences.join('.') + '.';

    return [updatedText, defaultRating];
}

function validateInput(arrayOfStrings) {
    // Strings validation
    const isDataValid = isValidArrayOfStrings(arrayOfStrings);

    if (!isDataValid) {
        return false;
    }

    // Filter out empty strings
    const filterOutEmptyStrings = arrayOfStrings.filter(Boolean);

    // if it doesnt contain 3 string (cityName, placeName, countryName) - return false
    if (filterOutEmptyStrings.length !== 3) {
        return false;
    }

    return true;
}

module.exports = {
    generateAICommentsForCommentBots,
};
