import BlogCard from './blogCard';
import Blog_Solid from '/blog-solid.png';
import { useEffect, useState } from 'react';
import getBlogsByUserId from '../../../services/getBlogsByUserId';

const MyBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const fetchAllBlogs = async () => {
    const responseData = await getBlogsByUserId();
    if (responseData.blogs) {
      setDataFetched(true);
      setAllBlogs(responseData.blogs);
    }
  };
  useEffect(() => {
    fetchAllBlogs();
  }, []);
  return (
    <section className="flex flex-col p-4 justify-center items-center">
      {allBlogs.length === 0 ? (
        <p>{dataFetched ? 'No data' : 'Loading...'}</p>
      ) : (
        <>
          {' '}
          <div className="flex space-x-2 items-center w-[80%] md:w-[70%]">
            <img src={Blog_Solid} alt="Blog_Solid" className="h-4 w-4" />
            <p>My blogs</p>
          </div>
          <div className="flex flex-col w-[80%] justify-center py-4 space-y-4 md:w-[70%]">
            {allBlogs.map((blog, index) => (
              <BlogCard key={index} {...blog} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MyBlogs;
