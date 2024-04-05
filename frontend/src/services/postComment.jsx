const POST_COMMENT_API =
  import.meta.env.VITE_COMMENT_API || 'http://localhost:8000/blog/comment';

const headers = { 'Content-Type': 'application/json' };

const postComment = async (blogId, content) => {
  const response = await fetch(POST_COMMENT_API, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ blogId: blogId, content: content }),
    credentials: 'include',
  });
  const responseData = await response.json();
  return responseData;
};

export default postComment;
