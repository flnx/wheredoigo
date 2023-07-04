const mongoose = require('mongoose');

const failedImgDeletionSchema = new mongoose.Schema({
    public_ids: {
        type: [String],
        required: true,
    },
});


const FailedDeletion = mongoose.model('FailedDeletion', failedImgDeletionSchema);

module.exports = FailedDeletion;
