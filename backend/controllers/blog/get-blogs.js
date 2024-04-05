const Blog = require("../../model/blog");

const GetBlogs = async (req, res) => {
  const headers = req.headers;
  try {
    const blogType = headers.blogtype;
    // console.log("blogType: ", blogType);
    // console.log("headers: ", headers);
    if (
      !(
        blogType === "new" ||
        blogType === "suggested" ||
        blogType === "trending"
      )
    ) {
      return res.status(401).json({ message: "invalid request headers" });
    }

    let data = [];
    switch (blogType) {
      case "new":
        data = await Blog.find({}).sort({ natural: -1 }).limit(5);
        break;
      case "trending":
        data = await Blog.find().sort({ views: -1 }).limit(6);
        break;
      case "suggested":
        data = await Blog.find().sort({ views: -1 }).limit(5);
        break;
      default:
        break
    }

    const blogs = data.map((item) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.toDateString()}`
      return {
        blogId: item._id,
        title: item.title,
        content: item.content,
        featuredImage: item.featuredImage,
        tag: item.tag,
        views: item.views,
        readTime: item.readTime,
        createdAt: formattedDate,
        name: item.authorName,
        profileImage: item.authorImage,
      }
    });

    return res.json({ blogs: blogs });
  } catch (err) {
    // console.log("error in getting blogs: ", err);
    return res.json({ message: "error" });
  }
};

module.exports = GetBlogs;
