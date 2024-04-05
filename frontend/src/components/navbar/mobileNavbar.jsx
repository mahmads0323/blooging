import { NavLink } from 'react-router-dom';
import Bars_Solid from '/bars-solid.png';
import Circle_Xmark from '/circle-xmark.png';
import { useState, useEffect } from 'react';
import { useContextStore } from '../context/contextStore';
import { useCookies } from 'react-cookie';

const MobileNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openLoginPortal } = useContextStore();
  const [cookies, , deleteCookies] = useCookies(['userToken']);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };
  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    deleteCookies('userToken');
    setIsLoggedin(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (cookies.userToken) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  }, [cookies]);

  return (
    <>
      <nav className="bg-softRed flex px-6 py-3 items-center justify-between border-b-2 border-black fixed top-0 w-full z-[1]">
        <div>
          <NavLink to="/" className="cursor-pointer text-xl font-semibold">
            Blogger
          </NavLink>
        </div>
        <div className="flex items-center">
          <button onClick={handleOpenMenu}>
            <img src={Bars_Solid} alt="Bars_Solid" className="w-4 h-4" />
          </button>
        </div>
      </nav>
      <div
        className={`flex flex-col items-center fixed w-full h-full bg-white z-10 top-0 transition-all ${
          isMenuOpen ? 'left-[0%]' : '-left-[100%]'
        }`}
      >
        <div className=" flex items-center h-[10%] w-full">
          <button
            onClick={handleCloseMenu}
            className="bg-softRed w-full h-full cursor-pointer flex items-center justify-end px-4"
          >
            <img src={Circle_Xmark} alt="Circle_Xmark" className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col h-[80%] justify-center text-xl space-y-2 text-waterGreen">
          <NavLink
            to="/"
            className="active:text-darkYellow hover:text-darkYellow underline underline-offset-2"
            onClick={handleCloseMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/all-blogs"
            className="active:text-darkYellow hover:text-darkYellow underline underline-offset-2"
            onClick={handleCloseMenu}
          >
            All Blogs
          </NavLink>
          {isLoggedIn && (
            <>
              <NavLink
                to="/new-blog"
                className="active:text-darkYellow hover:text-darkYellow underline underline-offset-2"
                onClick={handleCloseMenu}
              >
                New Blog
              </NavLink>
              <NavLink
                to="/account"
                className="active:text-darkYellow hover:text-darkYellow underline underline-offset-2"
                onClick={handleCloseMenu}
              >
                Account
              </NavLink>
            </>
          )}
        </div>
        <div className="flex items-center justify-center  h-[10%] w-full ">
          {isLoggedIn ? (
            <button
              className="bg-softRed text-waterGreen w-[25%] cursor-pointer text-lg font-semibold rounded-lg active:scale-95 px-4 py-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-softRed text-waterGreen w-[25%] cursor-pointer text-lg font-semibold rounded-lg active:scale-95 px-4 py-1"
              onClick={openLoginPortal}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
