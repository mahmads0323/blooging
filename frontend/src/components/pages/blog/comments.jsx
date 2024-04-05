import { useEffect, useState } from 'react';
import USER_REGULAR from '/user-regular.png';
import postComment from '../../../services/postComment';
import getComments from '../../../services/getComments';

const sample = [
  {
    User_Image: USER_REGULAR,
    User_Name: 'Ahmad',
    USer_Comment: 'Awesome one',
  },
  {
    User_Image: USER_REGULAR,
    User_Name: 'Ahmad',
    USer_Comment: 'Nice one',
  },
  {
    User_Image: USER_REGULAR,
    User_Name: 'Ahmad',
    USer_Comment:
      'Awesome one Awesome one Awesome one Awesome one Awesome one Awesome one Awesome one Awesome one ',
  },
];

const Comments = ({ blogId }) => {
  const [userComment, setUserComment] = useState('');
  const [allComments, setAllComment] = useState([]);
  const [message, setMessage] = useState('');
  const handleCommentValue = (e) => {
    setUserComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await postComment(blogId, userComment);
    console.log('responseData: ', responseData);
    setUserComment('');
    fetchAllComments();
  };

  const fetchAllComments = async () => {
    setMessage('Loading...');
    const responseData = await getComments(blogId);
    if (!responseData.comments) {
      setMessage('no comments yet');
      setAllComment([]);
      return;
    }
    setMessage('no comments yet');
    setAllComment(responseData.comments);
  };

  useEffect(() => {
    fetchAllComments();
  }, [blogId]);

  return (
    <section>
      <p className="text-softRed font-bold text-xl w-full border-t border-black py-2 md:text-2xl">
        Comments:
      </p>
      <form onSubmit={handleSubmit}>
        <p>Add comment</p>
        <input
          required={true}
          type="text"
          value={userComment}
          onChange={handleCommentValue}
          placeholder="write"
          className="text-textColor px-2 py-1 border-b border-black w-full focus:outline-none focus:border-b focus:pb-3"
        />
        <div className="flex w-full justify-end">
          <input
            type="submit"
            className="bg-black my-2 px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95"
          />
        </div>
      </form>
      {allComments.length > 0 ? (
        <div className="py-4">
          {allComments.map((comment, index) => (
            <div key={index} className="py-2">
              <div className="flex space-x-2 items-center">
                <img
                  src={comment.profileImage}
                  alt="User_Image"
                  className="h-4 w-4 rounded-full"
                />
                <p className="font-semibold">{comment.name}</p>
              </div>
              <p className="pl-6">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </section>
  );
};

export default Comments;
