const Comment = require("../../model/comment.");
const verifyToken = require("../../utils/authentication/verifyToken");

const PostComment = async (req, res) => {
  const { blogId, content } = req.body;
  if(!blogId || !content){
    return res.json({message: "invalid comment"})
  }
  const userToken = req.cookies.userToken;
  if (!userToken) {
    return res.json({ message: "invalid user token" });
  }
  const payload = verifyToken(userToken);
  console.log("payload: ", payload);
  const { userId, name, profileImage } = payload;
  try{
    const createdComment = await Comment.create({
        content: content,
        userId: userId,
        userName: name,
        userProfileImage: profileImage,
        blogId: blogId
    })
   return res.json({message: "comment created"})
  }catch(err){
    return res.json({message: "error creating comment: " + err})
  }
};

module.exports = PostComment;
