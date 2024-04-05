const GET_COMMENTS_API =
  import.meta.env.VITE_COMMENT_API || 'http://localhost:8000/blog/comment';

const getComments = async (blogId) => {
  // console.log('get comment blogId: ', blogId);
  const headers = {
    blogId: blogId,
  };
  const response = await fetch(GET_COMMENTS_API, {
    method: 'GET',
    headers: headers,
  });
  const responseData = await response.json();
  return responseData;
};

export default getComments;
