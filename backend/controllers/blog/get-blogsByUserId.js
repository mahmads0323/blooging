const Blog = require("../../model/blog");
const User = require("../../model/user");
const verifyToken = require("../../utils/authentication/verifyToken");

const GetBlogsByUserId = async (req, res) => {
  const userToken = req.cookies.userToken;
  if(!userToken){
    return res.json({message: "invalid user token"})
  }
  const payload = verifyToken(userToken)
  const userId = payload.userId;
  if (!userId) {
    return res.json({ message: "invalid user id" });
  }
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.json({ message: "no user found" });
    }
    // console.log("currentUser createdBlogs", currentUser.createdBlogs)
    let createdBlogs = []
    for (const blogId of currentUser.createdBlogs){
        try{
            const blog = await Blog.findById(blogId)
            if(!blog){
                // console.log("no blog found for id: ", blogId);
                continue;
            }
            createdBlogs.push({
                blogId: blog._id,
                title: blog.title,
                content: blog.content,
                featuredImage: blog.featuredImage,
                views: blog.views,
                createdAt: blog.createdAt,
                name: blog.authorName,
                profileImage: blog.authorImage,
            });
        }
        catch(err){
            // console.log("error in finding blog by user id", err);
        }
    }
    // console.log("createdBlogs: ", createdBlogs);
    return res.json({ blogs: createdBlogs });
  } catch (err) {
    // console.log("error getting blogs: ", err);
    return res.json({message: "cannot get blogs"})
  }
};

module.exports = GetBlogsByUserId;
