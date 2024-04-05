const NEW_BLOGS_API =
  import.meta.env.VITE_NEW_BLOGS || 'http://localhost:8000/blog/many-blogs';

const getBlogs = async (blogType) => {
  //  console.log('blogType: ', blogType);
  const headers = {
    blogType: blogType,
  };
  const response = await fetch(NEW_BLOGS_API, {
    method: 'GET',
    headers: headers,
  });
  const responseData = await response.json();
  return responseData;
};

export default getBlogs;
