const Comment = require("../../model/comment.");

const GetComments = async(req, res)=>{
    const blogId = req.headers.blogid;
    if(!blogId){
        return res.json({message: "no blog id for comments"})
    }
    try{
        const commentsData = await Comment.find({blogId: blogId})
        const comments = commentsData.map(item => {
            return {
                content: item.content,
                name: item.userName,
                profileImage: item.userProfileImage,
            }
        })
        return res.json({comments: comments})
    }catch(err){
        return res.json({message: "error fetching comments: " + err})
    }
}

module.exports = GetComments