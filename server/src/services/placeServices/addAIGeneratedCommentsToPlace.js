const User = require('../../models/userSchema');
const {
    generateAICommentsForCommentBots,
} = require('../openAI/generateAICommentsForCommentBots');

async function addAIGeneratedCommentsToPlace(placeId) {
    // const fakeUserCommenterIds = []
    // const users = await User.find({ role: 'commenter' }).select('_id');
    const comments = await generateAICommentsForCommentBots(
        'Varna',
        'Ocean Avenue',
        'Bulgaria'
    );

    return comments;
}

module.exports = {
    addAIGeneratedCommentsToPlace,
};
