const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minlength: [2, 'Title must be at least 2 characters long.'],
    },
    content: {
        type: String,
        trim: true,
        minlength: [10, 'Content must be at least 10 characters long.'],
    },
    time: {
        type: Date,
        default: Date.now,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
