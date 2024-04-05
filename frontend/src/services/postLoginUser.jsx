const VALIDATE_USER_API =
  import.meta.env.VITE_VALIDATE_USER || 'http://localhost:8000/user/login';

const headers = { 'Content-Type': 'application/json' };

const postLoginUser = async (loginDetails) => {
  const loginData = {
    email: loginDetails.email,
    password: loginDetails.password,
  };
  const response = await fetch(VALIDATE_USER_API, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ loginData: loginData }),
  });
  const responseData = await response.json();
  return responseData;
};

export default postLoginUser;
