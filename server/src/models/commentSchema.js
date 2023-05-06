const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { errorMessages } = require('../constants/errorMessages');

const commentSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: [2, errorMessages.commentTitle],
    },
    content: {
        type: String,
        trim: true,
        minlength: [10, errorMessages.invalidComment],
    },
    time: {
        type: Date,
        default: Date.now,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;