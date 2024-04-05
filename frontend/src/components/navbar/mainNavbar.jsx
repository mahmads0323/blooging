import { NavLink } from 'react-router-dom';
import { useContextStore } from '../context/contextStore';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const MainNavbar = () => {
  const [cookies, , deleteCookies] = useCookies(['userToken']);
  const { openLoginPortal } = useContextStore();
  const [isLoggedIn, setIsLoggedin] = useState(false);

  useEffect(() => {
    if (cookies.userToken) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [cookies]);

  const handleLogout = () => {
    setIsLoggedin(false);
    deleteCookies('userToken');
  };

  return (
    <nav className="bg-softRed flex px-6 py-3 items-center justify-between lg:px-6 border-b-2 border-black fixed top-0 z-[1] w-full">
      <div>
        <p className="cursor-pointer font-semibold text-xl">Blogger</p>
      </div>
      <div className="flex space-x-4">
        <NavLink
          to="/"
          className=" hover:text-darkYellow hover:underline underline-offset-2"
        >
          Home
        </NavLink>
        <NavLink
          to="/all-blogs"
          className=" hover:text-darkYellow  hover:underline underline-offset-2"
        >
          All Blogs
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/new-blog"
            className=" hover:text-darkYellow  hover:underline underline-offset-2"
          >
            New Blog
          </NavLink>
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex space-x-2 items-center">
            <NavLink
              to="/account"
              className=" hover:text-darkYellow  hover:underline underline-offset-2"
            >
              Account
            </NavLink>
            <button
              className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95"
            onClick={openLoginPortal}
          >
            Get started
          </button>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
