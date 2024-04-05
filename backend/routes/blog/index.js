const express = require("express");
const AddBlog = require("../../controllers/blog/add-blog");
const GetBlogs = require("../../controllers/blog/get-blogs");
const GetSingleBlog = require("../../controllers/blog/get-singleBlog");
const UpdateBlog = require("../../controllers/blog/update-blog");
const GetBlogsByUserId = require("../../controllers/blog/get-blogsByUserId");
const DeleteBlog = require("../../controllers/blog/delete-blog");
const GetBlogsByTag = require("../../controllers/blog/get-blogsByTag");
const { route } = require("../image");
const PostComment = require("../../controllers/comment/post-comment");
const GetComments = require("../../controllers/comment/get-Comments");

const router = express.Router();
router.post("/add", AddBlog)
router.get("/many-blogs", GetBlogs);
router.get("/blogs-by-userid", GetBlogsByUserId)
router.get("/blogs-by-tag", GetBlogsByTag)
router.patch("/update", UpdateBlog)

router.route("/").get(GetSingleBlog).delete(DeleteBlog)

// comments
router.route("/comment").post(PostComment).get(GetComments)

module.exports = router;