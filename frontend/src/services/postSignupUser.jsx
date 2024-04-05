const POST_USER_API =
  import.meta.env.VITE_POST_USER || 'http://localhost:8000/user/signup';

const headers = { 'Content-Type': 'application/json' };
const postSignupUser = async (signupDetails) => {
  const signupData = {
    name: signupDetails.name,
    email: signupDetails.email,
    password: signupDetails.password,
    profileImage: signupDetails.profileImage,
  };
  const response = await fetch(POST_USER_API, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ signupData: signupData }),
  });
  const responseData = await response.json();
  return responseData;
};

export default postSignupUser;
