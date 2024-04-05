import { useState, useEffect } from 'react';
import TrendingCard from '../../reusable/trendingCard';
import Trend_Up from '/arrow-trend-up-solid.png';
import getBlogs from '../../../services/getBlogs';

const TrendingBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const blogType = 'trending';
    const newBlogs = await getBlogs(blogType);
    setBlogs(newBlogs.blogs);
    // console.log('newBlogs: ', newBlogs.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section className="w-full flex flex-col items-center py-4 space-y-4 md:py-8">
      <div className="w-[80%] text-left md:pl-4 flex items-center space-x-2 sm:w-[70%] md:w-[90%]">
        <img src={Trend_Up} alt="Trend_Up" className="h-4 w-4" />
        <p>Trending Blogs</p>
      </div>
      <div className="flex flex-col w-[80%] items-center justify-center space-y-2 sm:w-[70%] md:flex-row md:w-[90%] md:flex-wrap md:space-y-4 md:items-end md:justify-around">
        {blogs.length !== 0 &&
          blogs.map((blog, index) => <TrendingCard key={index} {...blog} />)}
      </div>
    </section>
  );
};

export default TrendingBlogs;
