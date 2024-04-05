const BLOG_URL = import.meta.env.VITE_BLOG_URL || 'http://localhost:5173/blog';

const Card = (props) => {
  return (
    <div className="flex flex-col m-2 space-y-4 hover:scale-[1.01] shadow-md overflow-hidden">
      <div>
        <img
          src={props.featuredImage}
          alt="blogImage"
          className="h-24 w-full rounded-t-md"
        />
      </div>
      <div className="flex flex-col space-y-2 p-2">
        <a
          href={`${BLOG_URL}/${props.blogId}`}
          className="font-bold text-softRed md:w-max text-wrap md:text-nowrap"
        >
          {props.title}
        </a>
        <div className="flex space-x-2 items-center">
          <img
            src={props.profileImage}
            alt="authorImage"
            className="h-3 w-3 md:h-4 md:w-4 rounded-full"
          />
          <p className="text-base font-semibold">{props.name}</p>
        </div>
        <div className="text-xs flex justify-between">
          <p>{props.createdAt}</p>
          <p>{props.readTime} sec read</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
