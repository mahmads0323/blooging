import { useNavigate } from 'react-router';
import deletBlog from '../../../services/deleteBlog';
import deleteBlogImages from '../../reusable/deleteBlogImages';
import Edit_Regular from '/pen-to-square-regular.png';
import Trash_regular from '/trash-can-regular.png';

const BlOG_URL = import.meta.env.VITE_BLOG_URL || 'http://localhost:5173/blog';

const BlogCard = (props) => {
  const navigate = useNavigate();
  const handleDeleteBlog = async (blogId) => {
    // console.log('blogId', blogId);
    await deletBlog(blogId);
    deleteBlogImages(props.content, props.featuredImage);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const handleEditBlog = (blogId) => {
    navigate(`/account/blog/${blogId}`);
  };
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center border shadow-lg">
      <div className="flex flex-col space-y-2 items-center md:flex-row md:flex-[80%] md:space-x-2">
        <div className="md:flex-[50%] h-24 w-full md:w-24 md:h-28">
          <img
            src={props.featuredImage}
            alt="featuredImage"
            className="rounded-t-lg md:rounded-tr-none md:rounded-l-lg h-full w-full"
          />
        </div>
        <div className="md:flex-[50%] flex flex-col w-full px-2">
          <a
            href={`${BlOG_URL}/${props.blogId}`}
            className="font-semibold text-softRed w-full "
          >
            {props.title}
          </a>
          {/* <p>{props.blogDescription}</p> */}
          <p className="text-xs">
            views: <span className="font-semibold">{props.views}</span>
          </p>
          <p className="text-xs hidden md:block">Date: {props.createdAt}</p>
        </div>
      </div>
      <div className="flex justify-between pb-2 px-2">
        <p className="text-xs md:hidden">Date: {props.createdAt}</p>
        <div className="flex md:flex-[20%] space-x-2">
          <button onClick={() => handleEditBlog(props.blogId)}>
            <img
              src={Edit_Regular}
              alt="Edit_Regular"
              className="h-4 w-4 active:scale-105"
            />
          </button>
          <button onClick={() => handleDeleteBlog(props.blogId)}>
            <img
              src={Trash_regular}
              alt="Trash_regular"
              className="h-4 w-4 active:scale-105"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
