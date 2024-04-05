const GET_USER_API =
  import.meta.env.VITE_GET_USER || 'http://localhost:8000/user/';

const getUserDetails = async () => {
  const response = await fetch(GET_USER_API, {
    method: 'GET',
    credentials: 'include',
  });
  const responseData = await response.json();
  return responseData;
};

export default getUserDetails;
