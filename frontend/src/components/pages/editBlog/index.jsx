import EditBlogEditor from './editor';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

const EditBlogPage = () => {
  const [cookies, ,] = useCookies(['userToken']);

  useEffect(() => {
    if (window.location.href === '/') {
      return;
    }
    if (!cookies.userToken) {
      window.location.replace('/');
    }
  }, [cookies.userToken]);
  return <EditBlogEditor />;
};

export default EditBlogPage;
