import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import getSingleBlog from '../../../services/getSingleBlog';
import './blog.css';
import Comments from './comments';

const BlogContent = () => {
  const [blog, setBlog] = useState('');
  const params = useParams();
  const contentRef = useRef(null);
  const fetchBlog = async () => {
    const blogId = params.blogId;
    if (!blogId) {
      return;
    }
    const blogData = await getSingleBlog(blogId);
    setBlog(blogData.blog);
    // console.log('blog: ', blogData);
  };

  const updateBlog = () => {
    // const contentCotainer = document.getElementById('contentCotainer');
    contentRef.current.innerHTML = blog.content;
  };

  useEffect(() => {
    fetchBlog();
  }, []);
  useEffect(() => {
    updateBlog();
  }, [blog]);

  return (
    <>
      {blog !== null && (
        <section className="pt-24 ">
          <section className="flex space-x-2 items-center py-4">
            <img
              src={blog.profileImage}
              alt="profileImage"
              className="h-4 w-4 rounded-full"
            />
            <p>{blog.name}</p>
          </section>
          <div className="flex items-center justify-between w-full text-sm">
            <p>Dated: {blog.createdAt}</p>
            <p>{blog.readTime} min read</p>
          </div>

          <div className="flex flex-col w-full  space-y-2">
            <div className="w-full pt-4">
              <h2 className="text-softRed text-2xl font-bold py-2">
                {blog.title}
              </h2>
              <img
                src={blog.featuredImage}
                alt="featuredImage"
                className="w-full h-[130px] object-fill sm:h-[160px] md:h-[200px] lg:h-[240px]"
              />
            </div>
            <div
              ref={contentRef}
              id="contentContainer"
              className="w-full flex flex-col overflow-x-hidden"
            ></div>
            <Comments blogId={blog.blogId} />
          </div>
        </section>
      )}
    </>
  );
};

export default BlogContent;
