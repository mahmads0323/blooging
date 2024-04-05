const SINGLE_BLOG_API =
  import.meta.env.VITE_SINGLE_BLOG || 'http://localhost:8000/blog';

const getSingleBlog = async (blogId) => {
  const headers = { blogId: blogId };
  const response = await fetch(SINGLE_BLOG_API, {
    method: 'GET',
    headers: headers,
  });
  const responseData = await response.json();
  // console.log('blogid: ', blogId);
  return responseData;
};

export default getSingleBlog;
