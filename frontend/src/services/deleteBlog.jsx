const DELETE_BLOG_API =
  import.meta.env.VITE_DELETE_BLOG || 'http://localhost:8000/blog';
const headers = { 'Content-Type': 'application/json' };

const deletBlog = async (blogId) => {
  const response = await fetch(DELETE_BLOG_API, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ blogId: blogId }),
    credentials: 'include',
  });
  const responseData = await response.json();
  return responseData;
};

export default deletBlog;
