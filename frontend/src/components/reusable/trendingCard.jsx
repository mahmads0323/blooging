const BLOG_URL = import.meta.env.VITE_BLOG_URL || 'http://localhost:5173/blog';

const TrendingCard = (props) => {
  return (
    <div className="w-full flex flex-col space-y-2 p-4 rounded-md border shadow-md md:w-[30%] hover:scale-105 transition-all">
      <div className="flex items-center space-x-2">
        <img
          src={props.profileImage}
          alt="authorImage"
          className="h-4 w-4 rounded-full"
        />
        <p className="font-medium text-sm">{props.name}</p>
      </div>
      <a
        href={`${BLOG_URL}/${props.blogId}`}
        className="text-lg font-bold text-softRed w-max"
      >
        {props.title}
      </a>
      <div className="flex space-x-2 opacity-85 items-center text-xs">
        <span>{props.createdAt}</span>
        <span>-</span>
        <span>{props.readTime} sec read</span>
      </div>
    </div>
  );
};

export default TrendingCard;
