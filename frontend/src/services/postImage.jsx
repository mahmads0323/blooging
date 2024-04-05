const POST_IMAGE_API =
  import.meta.env.VITE_POST_IMAGE || 'http://localhost:8000/images/add';

const PostImage = async (formData) => {
  const response = await fetch(POST_IMAGE_API, {
    method: 'POST',
    body: formData,
  });
  const responseData = await response.json();
  return responseData;
};

export default PostImage;
