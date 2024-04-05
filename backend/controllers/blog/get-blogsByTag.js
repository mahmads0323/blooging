const Blog = require("../../model/blog");

const GetBlogsByTag = async (req, res) => {
  const { tag, searchvalue } = req.headers;
  let filter = {};
  if (searchvalue !== "") {
    filter = { ...filter, $text: { $search: searchvalue } };
  }
  if (tag !== "") {
    filter = { ...filter, tag: tag };
  }
  console.log("headers: ", tag);
  try {
    const data = await Blog.find(filter);
    const blogs = data.map((item) => {
      const date = new Date(item.createdAt);
      const formattedDate = `${date.toDateString()}`;
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
      };
    });
    return res.json({ blogs: blogs });
  } catch (err) {
    return res.json({ message: "err getting blogs by tag: " + err });
  }
};

module.exports = GetBlogsByTag;
