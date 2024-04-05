import BlogCard from './blogCard';

const Blogs = ({ blogs }) => {
  // console.log(blogs.length);
  return (
    <section className="flex justify-center">
      <div className="flex flex-col w-[80%] items-center justify-center py-6 space-y-4 sm:w-[90%] sm:flex-row sm:flex-wrap sm:justify-around sm:items-baseline ">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </section>
  );
};

export default Blogs;
