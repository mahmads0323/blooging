const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      index: true,
      text: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
    views: {
      type: Number,
      required: true,
    },
    readTime: {
      type: Number,
      required: true,
    },
    authorName: {
      type: String,
    },
    authorImage: {
      type: String,
    },
    comments: [{ type: String }],
  },
  { timestamps: true, autoIndex: true }
);

const Blog = mongoose.model("blogs", blogSchema);

module.exports = Blog;
