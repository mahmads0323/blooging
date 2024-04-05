
const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    userProfileImage: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    blogId: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;