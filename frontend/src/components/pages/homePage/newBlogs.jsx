import Card from '../../reusable/card';
import Cube_Solid from '/cubes-solid.png';
import SlickSlider from '../../reusable/slider';
import { useEffect, useState } from 'react';
import getBlogs from '../../../services/getBlogs';

const NewBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const blogType = 'new';
    const newBlogs = await getBlogs(blogType);
    setBlogs(newBlogs.blogs);
    // console.log('newBlogs: ', newBlogs.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <section className="p-4 py-8">
      <div className="w-[80%] text-left px-[10%] pb-4 flex items-center space-x-2 sm:px-[15%] md:px-[5%]">
        <img src={Cube_Solid} alt="Cube_Solid" className="h-4 w-4" />
        <p>New Blogs</p>
      </div>
      <div className="slider-container px-[10%] overflow-hidden sm:px-[15%] md:px-[5%]">
        {blogs.length !== 0 && (
          <SlickSlider>
            {blogs.map((blog, index) => (
              <Card key={index} {...blog} />
            ))}
          </SlickSlider>
        )}
      </div>
    </section>
  );
};

export default NewBlogs;
