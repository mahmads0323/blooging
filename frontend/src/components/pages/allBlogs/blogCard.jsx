const BLOG_URL = import.meta.env.VITE_BLOG_URL;

const BlogCard = (props) => {
  // console.log('props: ', props);
  return (
    <div className="flex flex-col w-full rounded-lg border shadow-lg sm:w-[40%] md:w-[30%]">
      <div>
        <img
          src={props.featuredImage}
          alt="featuredImage"
          className="object-fill h-32 w-full rounded-t-lg"
        />
      </div>
      <div className="p-4 space-y-2">
        <a
          href={`${BLOG_URL}/${props.blogId}`}
          className="text-lg font-bold text-softRed w-max"
        >
          {props.title}
        </a>
        <div className="flex items-center space-x-2">
          <img
            src={props.profileImage}
            alt="authorImage"
            className="h-4 w-4 rounded-full"
          />
          <p className="font-medium text-sm">{props.name}</p>
        </div>
        <div className="flex space-x-2 opacity-85 items-center justify-between text-xs">
          <span>{props.createdAt}</span>
          <span>-</span>
          <span>{props.readTime} min read</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
