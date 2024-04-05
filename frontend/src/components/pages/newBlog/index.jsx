import AddBlogEditor from './editor';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const NewBlogPage = () => {
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
      <AddBlogEditor />
    </>
  );
};

export default NewBlogPage;
