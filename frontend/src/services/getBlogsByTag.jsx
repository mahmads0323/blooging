const GET_BLOGS_BY_TAG_API =
  import.meta.env.VITE_BLOGS_BY_TAG ||
  'http://localhost:8000/blog/blogs-by-tag';

const getBlogsByTag = async (tag, searchValue) => {
  const headers = {
    tag: tag,
    searchValue: searchValue,
  };
  const response = await fetch(GET_BLOGS_BY_TAG_API, {
    method: 'GET',
    headers: headers,
  });
  const responseData = await response.json();
  return responseData;
};

export default getBlogsByTag;
