import BlogContent from './blogContent';

const BlogPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[90%] md:w-[70%] lg:w-[50%]">
        <BlogContent />
      </div>
    </div>
  );
};

export default BlogPage;
