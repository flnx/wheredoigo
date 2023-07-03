const { validateMultipleCommentsData } = require('../../utils/attachIDsToComments');
const { fetchAIComments } = require('./fetchAIComments');

async function commentsGeneratedByAI({ name, country, city, numOfCommenters }) {
    let retryCount = 0;
    const MAX_RETRIES = 1;

    let comments;
    // retry mechanism if comment generation fails

    while (retryCount <= MAX_RETRIES) {
        try {
            comments = await fetchAIComments(city, name, country, numOfCommenters);

            validateMultipleCommentsData(comments);

            // returns the result if the comments are successfully generated
            return comments;
        } catch (error) {
            retryCount++;

            if (retryCount <= MAX_RETRIES) {
                console.error(
                    `Failed to generate AI comments. Retrying... (Attempt ${retryCount})`
                );

                // 500ms delay before retrying
                await delay(500);
            } else {
                throw error;
            }
        }
    }

    function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

module.exports = {
    commentsGeneratedByAI,
};
