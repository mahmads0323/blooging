const POST_UPDATE_USER_API =
  import.meta.env.VITE_POST_UPDATE_USER || 'http://localhost:8000/user/';
const headers = { 'Content-Type': 'application/json' };

const updateUserDetails = async (userDetails) => {
  let userData = {};
  if (userDetails.name) {
    userData = { name: userDetails.name };
  }
  if (userDetails.email) {
    userData = { ...userData, email: userDetails.email };
  }
  if (userDetails.profileImage) {
    userData = { ...userData, profileImage: userDetails.profileImage };
  }
  console.log('userDetails: ', userDetails);
  const response = await fetch(POST_UPDATE_USER_API, {
    method: 'PATCH',
    body: JSON.stringify({ userData: userData }),
    headers: headers,
    credentials: 'include',
  });
  const responseData = await response.json();
  return responseData;
};

export default updateUserDetails;
