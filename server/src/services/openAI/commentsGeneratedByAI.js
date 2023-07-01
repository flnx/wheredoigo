const { generateAICommentsForCommentBots } = require('../openAI/generateAICommentsForCommentBots');

async function commentsGeneratedByAI({ name, country, city, numOfCommenters }) {
    let retryCount = 0;
    const MAX_RETRIES = 1;

    let comments;
    // retry mechanism if comment generation fails

    while (retryCount <= MAX_RETRIES) {
        try {
            comments = await generateAICommentsForCommentBots(
                city,
                name,
                country,
                numOfCommenters
            );
            return comments; // returns the result if the comments are successfully generated
        } catch (error) {
            retryCount++;

            if (retryCount <= MAX_RETRIES) {
                console.error(
                    `Failed to generate AI comments. Retrying... (Attempt ${retryCount})`
                );
                await delay(500); // 500ms delay before retrying
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
