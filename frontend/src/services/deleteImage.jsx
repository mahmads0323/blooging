const DELETE_IMAGE_API =
  import.meta.env.VITE_DELETE_IMAGE || 'http://localhost:8000/images/delete';
const headers = { 'Content-Type': 'application/json' };

const deleteImages = async (imagesToDelete) => {
  await fetch(DELETE_IMAGE_API, {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify({ imagesToDelete: imagesToDelete }),
  });
  //   const respones = await fetch(DELETE_IMAGE_API, {
  //     method: 'DELETE',
  //     headers: headers,
  //     body: JSON.stringify({ imagesToDelete: imagesToDelete }),
  //   });
  //   const responseData = await respones.json();
  //   console.log('responseData: ', responseData);
  return;
};

export default deleteImages;
