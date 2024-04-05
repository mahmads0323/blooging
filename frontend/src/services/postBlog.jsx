const POST_BLOG_API =
  import.meta.env.VITE_POST_BLOG || 'http://localhost:8000/blog/add';
const headers = { 'Content-Type': 'application/json' };

const postBlog = async (blog) => {
  const data = await fetch(POST_BLOG_API, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ blog: blog }),
    credentials: 'include',
  });
  const responseData = await data.json();
  // console.log('responseData: ', responseData);
  return responseData;
};

export default postBlog;
