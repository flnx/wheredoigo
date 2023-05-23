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

const userActivitySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [likeSchema],
});

userActivitySchema.index({ userId: 1 });

const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;
