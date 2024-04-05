const Blog = require("../../model/blog");
const User = require("../../model/user");
const verifyToken = require("../../utils/authentication/verifyToken");

const DeleteBlog = async (req, res) => {
  const userToken = req.cookies.userToken;
  if (!userToken) {
    return res.json({ message: "invalid user token" });
  }
  const payload = verifyToken(userToken);
  const userId = payload.userId;
  if (!userId) {
    return res.json({ message: "invalid user id" });
  }
  const blogId = req.body.blogId;
  // console.log("body: ", req.body)
  if(!blogId){
    return res.json({message: "no blog id"})
  }
  try{
    const result = await Blog.deleteOne({_id: blogId})
    if(result.deletedCount !== 1){
        return res.json({message: "cannot find blog to delete"})
    }
    try{
        const userResult = await User.updateOne({_id: userId}, {
            $pull: {
                createdBlogs: blogId,
            }
        })
        // console.log("user reult: ", userResult);
    }catch(err){
        console.log("cannot delete blogId from user: ", err);
    }
    return res.json({message: "blog deleted"})
  }catch(err){
    console.log("error in deleting blog: ", err)
    return res.json({message: "cannot delete blog"})
  }
};

module.exports = DeleteBlog;
