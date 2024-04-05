import React, { useRef, useState } from 'react';
import Portal from '../../reusable/portal';
import PostImage from '../../../services/postImage';
import Circle_Xmark from '/circle-xmark.png';
import updateUserDetails from '../../../services/updateUserDetails';

const initialDetails = {
  name: '',
  email: '',
  profileImage: '',
};
const EditPortal = ({ isPortalOpen, tooglePortal }) => {
  const [updateDetails, setUpdateDetails] = useState(initialDetails);
  const profileImageRef = useRef(null);
  const handleChangeName = (e) => {
    setUpdateDetails({ ...updateDetails, name: e.target.value });
  };
  const handleChangeEmail = (e) => {
    setUpdateDetails({ ...updateDetails, email: e.target.value });
  };
  const uploadProfileImage = async () => {
    // console.log('featured image: ', profileImageRef.current.files.length);
    const formData = new FormData();
    formData.append('image', profileImageRef.current.files[0]);
    const responseData = await PostImage(formData);
    return responseData.image;
  };

  const fetchUserDetails = async (updateDetails) => {
    const responseData = await updateUserDetails(updateDetails);
    // console.log('responseData: ', responseData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uploadedImage = await uploadProfileImage();
    await fetchUserDetails({ ...updateDetails, profileImage: uploadedImage });
    setUpdateDetails(initialDetails);
    tooglePortal();
  };
  return (
    <div className="h-screen w-screen fixed z-20 top-0 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-[80%] h-[80%] flex flex-col items-center justify-around relative border border-black border-solid rounded-lg">
        <button
          onClick={tooglePortal}
          className="w-full absolute top-5 flex justify-end px-4"
        >
          <img
            src={Circle_Xmark}
            alt="Circle_Xmark"
            className="h-4 w-4 md:h-6 md:w-6"
          />
        </button>
        <form
          action="#"
          onSubmit={handleSubmit}
          className="w-[80%] flex flex-col space-y-4"
        >
          <label htmlFor="update_name">
            <p>Name</p>
            <input
              type="text"
              id="update_name"
              onChange={handleChangeName}
              value={updateDetails.name}
              className="text-textColor py-1 px-2 w-full border border-solid border-black rounded-lg focus:border-2 focus:outline-none"
            />
          </label>
          <label htmlFor="update_email">
            <p>Email</p>
            <input
              type="email"
              id="update_email"
              onChange={handleChangeEmail}
              value={updateDetails.email}
              className="text-textColor py-1 px-2 w-full border border-solid border-black rounded-lg focus:border-2 focus:outline-none"
            />
          </label>
          <label htmlFor="update_profile_image" className="overflow-x-hidden">
            <p>Profile image</p>
            <input
              ref={profileImageRef}
              type="file"
              accept="image/*"
              id="update_profile_image"
            />
          </label>
          <input
            type="submit"
            value={'create'}
            className="bg-black px-3 py-1 text-softRed shadow-lg rounded-lg active:scale-95 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default EditPortal;
