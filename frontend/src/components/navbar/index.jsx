import { useEffect, useState } from 'react';
import MobileNavBar from './mobileNavbar';
import MainNavbar from './mainNavbar';

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.outerWidth);
  useEffect(() => {
    window.addEventListener('resize', (e) =>
      setScreenWidth(e.target.outerWidth)
    );
  }, []);
  return <>{screenWidth > '640' ? <MainNavbar /> : <MobileNavBar />}</>;
};

export default Navbar;
