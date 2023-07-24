const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { errorMessages } = require('../constants/errorMessages');

const commentSchema = new Schema({
    title: {
        type: String,
        trim: true,
        minLength: [2, errorMessages.validation.comment.title],
        maxLength: [100, errorMessages.validation.comment.title]
    },
    content: {
        type: String,
        trim: true,
        minLength: [10, errorMessages.validation.comment.body],
        maxLength: [2000, errorMessages.validation.comment.body],
    },
    time: {
        type: Date,
        default: Date.now,
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    placeId: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true,
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 1,
    },
});

commentSchema.index(
    { placeId: 1, ownerId: 1 },
    { unique: true, collation: { locale: 'en', strength: 2 } }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
