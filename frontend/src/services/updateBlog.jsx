const POST_UPDATE_BLOG_API =
  import.meta.env.VITE_POST_UPDATE_BLOG || 'http://localhost:8000/blog/update';
const headers = { 'Content-Type': 'application/json' };

const updateBlog = async (blog) => {
  const data = await fetch(POST_UPDATE_BLOG_API, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({ blog: blog }),
  });
  const responseData = await data.json();
  return responseData;
};

export default updateBlog;
