const Blog = require("../../model/blog");

const GetSingleBlog = async (req, res) => {
  const blogId = req.headers.blogid;
  if (!blogId) {
    return res.json({ message: "invalid blog" });
  }
  try {
    const data = await Blog.findByIdAndUpdate(blogId, {$inc: {views: 1}});
    const date = new Date(data.createdAt);
    const formattedDate = `${date.toDateString()}`
    const blog = {
      blogId: data._id,
      title: data.title,
      content: data.content,
      featuredImage: data.featuredImage,
      tag: data.tag,
      views: data.views,
      readTime: data.readTime,
      createdAt: formattedDate,
      name: data.authorName,
      profileImage: data.authorImage
    };
    return res.json({blog: blog})
  } catch (err) {
    return res.json({message: "no blog found"});
  }
};

module.exports = GetSingleBlog;
