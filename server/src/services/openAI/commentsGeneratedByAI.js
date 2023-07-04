const { validateMultipleCommentsData } = require('../../utils/attachIDsToComments');
const { fetchAIComments } = require('./fetchAIComments');

async function commentsGeneratedByAI({ name, country, city, numOfCommenters }) {
    let retryCount = 0;
    const MAX_RETRIES = 1;

    let comments;

    // Retry mechanism if comment generation fails
    while (retryCount <= MAX_RETRIES) {
        try {
            // Generate comments using AI model
            comments = await fetchAIComments(city, name, country, numOfCommenters);

            // Validate the generated comments data
            validateMultipleCommentsData(comments);

            // Returns the generated comments if successful
            return comments;
        } catch (error) {
            retryCount++;

            console.error(`commentsGeneratedByAi: ${error.message}`);

            if (retryCount <= MAX_RETRIES) {
                console.error(
                    `Failed to generate AI comments. Retrying... (Attempt ${retryCount})`
                );

                // 500ms delay before retrying
                await delay(500);
            } else {
                // Maximum retries reached, throw the error
                throw error;
            }
        }
    }

    // Helper function to introduce a delay
    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

module.exports = {
    commentsGeneratedByAI,
};
