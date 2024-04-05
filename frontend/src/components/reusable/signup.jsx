import { useEffect, useState } from 'react';
import CustomInput from './customInput';
import postSignupUser from '../../services/postSignupUser';
import { useCookies } from 'react-cookie';

const DEFAULT_USER_PROFILE_IMAGE = import.meta.env.VITE_DEFAULT_USER_IMAGE;
const inintialUserDetails = {
  name: '',
  email: '',
  password: '',
  profileImage: DEFAULT_USER_PROFILE_IMAGE,
};

const Signup = ({ changeIsLogin }) => {
  const [cookies, setCookies, deleteCookies] = useCookies(['userToken']);
  const [loginDetails, setLoginDetails] = useState(inintialUserDetails);
  const [errorMessage, setErrorMessage] = useState({});

  const handleNameChange = (e) => {
    setLoginDetails({ ...loginDetails, name: e.target.value });
  };
  const handleEmailChange = (e) => {
    setErrorMessage({ ...errorMessage, email: '' });
    setLoginDetails({ ...loginDetails, email: e.target.value });
  };
  const handlePasswordChange = (e) => {
    setErrorMessage({ ...errorMessage, password: '' });
    setLoginDetails({ ...loginDetails, password: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const responseData = await postSignupUser(loginDetails);
    console.log('responseData: ', responseData);
    if (responseData.message) {
      if (responseData.message.includes('email')) {
        setErrorMessage({ ...errorMessage, email: 'email aleady exists' });
      }
      if (responseData.message.includes('password')) {
        setErrorMessage({ ...errorMessage, password: 'use strong password' });
      }
      return;
    }
    setCookies('userToken', responseData.token, { path: '/' });
    setLoginDetails(inintialUserDetails);
    window.location.replace('/');
  };

  useEffect(() => {
    if (window.location.href === '/') {
      return;
    }
    if (cookies.userToken) {
      window.location.replace('/');
    }
  }, [cookies.userToken]);
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold text-softRed">Signup</p>
      <form
        action="#"
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center space-y-2 w-full"
      >
        <label>
          <p>Name</p>
          <CustomInput
            inputType="text"
            placeholder="Enter name"
            required={true}
            value={loginDetails.name}
            handleValueChange={handleNameChange}
          />
        </label>
        <label>
          <p>Email</p>
          <CustomInput
            inputType="email"
            placeholder="Enter email"
            required={true}
            value={loginDetails.email}
            handleValueChange={handleEmailChange}
          />
          <p className="text-sm text-red-500">{errorMessage.email}</p>
        </label>
        <label>
          <p>Password</p>
          <CustomInput
            inputType="text"
            placeholder="Enter password"
            required={true}
            value={loginDetails.password}
            handleValueChange={handlePasswordChange}
          />
          <p className="text-sm text-red-500">{errorMessage.password}</p>
        </label>
        <input
          type="submit"
          value="signup"
          className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
        />
      </form>

      <p className="text-xs pt-2">
        Already have account?{' '}
        <button onClick={changeIsLogin} className="text-softRed underline">
          login
        </button>
      </p>
    </div>
  );
};

export default Signup;
