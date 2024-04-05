const Blog = require("../../model/blog");
const User = require("../../model/user");
const verifyToken = require("../../utils/authentication/verifyToken");
const ReadTime = require("./readTime");

const AddBlog = async (req, res) => {
  const blog = req.body.blog;
  const userToken = req.cookies.userToken;
  if (!blog) {
    return res.json({ message: "no blog" });
  }
  if(!userToken){
    return res.json({message: "invalid user token"})
  }
  const payload = verifyToken(userToken)
  // console.log("payload: ", payload)
  const {userId, name, profileImage} = payload;
  if(!userId){
    // console.log("name: ", name)
    return res.json({messae: "invalid user"})
  }
  // console.log("userId: ", userId)
  const readTime = ReadTime(blog.content);
  try {
    const createdBlog = await Blog.create({
      title: blog.title,
      content: blog.content,
      featuredImage: blog.featuredImage,
      tag: blog.tag,
      views: 0,
      readTime: readTime,
      authorName: name,
      authorImage: profileImage,
    });
    // console.log("createdBlog: ", createdBlog)
    try {
      const currentUser = await User.findByIdAndUpdate(userId, {
        $push: {
            createdBlogs: createdBlog._id,
        }
      });
      // console.log("currentUser: ", currentUser)
      return res.json({ blogId: createdBlog._id });
    } catch (err) {
      return res.json({ message: "unable to link blog to user" });
    }
  } catch (err) {
    return res.json({ message: "unable to create blog" });
  }
};

module.exports = AddBlog;
