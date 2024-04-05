const DELETE_USER_API =
  import.meta.env.VITE_DELETE_USER || 'http://localhost:8000/user';

const deleteUser = async () => {
  const response = await fetch(DELETE_USER_API, {
    method: 'DELETE',
    credentials: 'include',
  });
  const responseData = await response.json();
  return responseData;
};

export default deleteUser;
