const Blog = require("../../model/blog");
const ReadTime = require("./readTime");


const UpdateBlog = async(req, res)=>{
    const blog = req.body.blog;
    // console.log("blog: ",blog)
    if(!blog){
        return res.json({message: "no blog"})
    }
    const blogId = blog.blogId;
    if(!blogId){
        return res.status(401).json({message: "no blogId"})
    }
    const readTime = ReadTime(blog.content)
    try{
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {
            title: blog.title,
            content: blog.content,
            featuredImage: blog.featuredImage,
            tag: blog.tag,
            readTime: readTime
        })
        return res.json({blogId: updatedBlog._id})
    }catch(err){
        return res.json({message: "unable to update blog" + err});
    }
}

module.exports = UpdateBlog