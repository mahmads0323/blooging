import MyBlogs from './myBlogs';
import UserInfo from './userInfo';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const AccountPage = () => {
  const [cookies, ,] = useCookies(['userToken']);

  useEffect(() => {
    if (window.location.href === '/') {
      return;
    }
    if (!cookies.userToken) {
      window.location.replace('/');
    }
  }, [cookies.userToken]);
  return (
    <>
      <UserInfo />
      <MyBlogs />
    </>
  );
};

export default AccountPage;
