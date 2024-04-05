import { useState } from 'react';
import Login from './login';
import Portal from './portal';
import Circle_Xmark from '/circle-xmark.png';
import Signup from './signup';
import { useContextStore } from '../context/contextStore';

const LoginAndSignup = () => {
  const { isLoginPortalOpen, closeLoginPortal } = useContextStore();
  const [isLogin, setIsLogin] = useState(true);
  const changeIsLogin = (e) => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <Portal isOpen={isLoginPortalOpen}>
        <div className="h-screen w-screen fixed z-20 top-0 flex justify-center items-center backdrop-blur-sm">
          <div className=" bg-white w-[80%] h-[80%] flex flex-col items-center justify-around relative border border-black border-solid rounded-lg">
            <button
              onClick={closeLoginPortal}
              className="w-full absolute top-5 flex justify-end px-4"
            >
              <img
                src={Circle_Xmark}
                alt="Circle_Xmark"
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </button>

            {isLogin ? (
              <Login changeIsLogin={changeIsLogin} />
            ) : (
              <Signup changeIsLogin={changeIsLogin} />
            )}
          </div>
        </div>
      </Portal>
    </div>
  );
};

export default LoginAndSignup;
