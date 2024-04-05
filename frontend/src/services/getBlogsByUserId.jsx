const BLOGS_BY_USER_ID_API =
  import.meta.env.VITE_BLOGS_BY_USER_ID ||
  'http://localhost:8000/blog/blogs-by-userid';
const getBlogsByUserId = async () => {
  const response = await fetch(BLOGS_BY_USER_ID_API, {
    method: 'GET',
    credentials: 'include',
  });
  const responseData = await response.json();
  // console.log('responseData: ', responseData);
  return responseData;
};

export default getBlogsByUserId;
