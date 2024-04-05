import { useState, useEffect } from 'react';
import CustomInput from './customInput';
import postLoginUser from '../../services/postLoginUser';
import { useCookies } from 'react-cookie';

const inintialUserDetails = {
  email: '',
  password: '',
};

const Login = ({ changeIsLogin }) => {
  const [cookies, setCookies, deleteCookies] = useCookies(['userToken']);
  const [loginDetails, setLoginDetails] = useState(inintialUserDetails);
  const [errorMessage, setErrorMessage] = useState({});

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
    const responseData = await postLoginUser(loginDetails);
    if (responseData.message) {
      if (responseData.message.includes('email')) {
        setErrorMessage({ ...errorMessage, email: 'email does not exists' });
      }
      if (responseData.message.includes('password')) {
        setErrorMessage({ ...errorMessage, password: 'incorrect password' });
      }
      return;
    }
    setCookies('userToken', responseData.token, { path: '/' });

    // console.log('responseData: ', responseData);
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
      <p className="font-semibold text-softRed">Login</p>
      <form
        action="#"
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center space-y-2 w-full"
      >
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
        <p className="text-xs text-left w-full">forgot password?</p>
        <input
          type="submit"
          value="login"
          className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
        />
      </form>

      <p className="text-xs pt-2">
        Dont have account?{' '}
        <button onClick={changeIsLogin} className="text-softRed underline">
          create one
        </button>
      </p>
    </div>
  );
};

export default Login;
