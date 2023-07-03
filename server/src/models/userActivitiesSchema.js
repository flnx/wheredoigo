const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    destination: {
        type: Schema.Types.ObjectId,
        ref: 'Destination',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const commentSchema = new Schema({
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const userActivitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [likeSchema],
    comments: [commentSchema],
});

userActivitySchema.index({ userId: 1 });

userActivitySchema.statics.addCommentActivity = async function (
    userId,
    placeId,
    commentId,
    session
) {
    const commentData = { place: placeId, comment: commentId };

    try {
        const result = await this.findOneAndUpdate(
            { userId },
            { $push: { comments: { $each: [commentData], $slice: -3 } } },
            { session, upsert: true, new: true }
        );

        if (!result) {
            throw new Error('Could not update user activity');
        }

        return !!result;
    } catch (err) {
        console.log(err.message);
        return false;
    }
};

userActivitySchema.statics.removeCommentActivity = async function (
    ownerId,
    placeId,
    session
) {
    await this.updateOne(
        { userId: ownerId },
        { $pull: { comments: { place: placeId } } },
        { session }
    );
};

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;
