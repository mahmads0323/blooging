import User_Regular from '/user-regular.png';
import Edit_Regular from '/pen-to-square-regular.png';
import { useEffect, useState } from 'react';
import Portal from '../../reusable/portal';
import EditPortal from './editPortal';
import getUserDetails from '../../../services/getUserDetails';
import deleteUser from '../../../services/deleteUser';
import { useCookies } from 'react-cookie';

const initialDetails = {
  name: 'name',
  email: 'email',
  profileImage: User_Regular,
};

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173';
const UserInfo = () => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(initialDetails);
  const [, , deleteCookies] = useCookies(['userToken']);
  const [message, setMessage] = useState('');
  const tooglePortal = () => {
    setIsPortalOpen(!isPortalOpen);
  };

  const fetchUserData = async () => {
    const responseData = await getUserDetails();
    const userData = responseData.data;
    // console.log('responseData: ', responseData);
    if (!userData) {
      return;
    }
    setUserDetails({
      name: userData.name,
      email: userData.email,
      profileImage: userData.profileImage
        ? userData.profileImage
        : initialDetails.profileImage,
    });
  };

  const handleDeleteUser = async () => {
    setMessage('');
    const responseData = await deleteUser();
    if (responseData.message.includes('success')) {
      deleteCookies('userToken');
      window.location.replace(CLIENT_URL);
      return;
    }
    setMessage(responseData.message);
  };

  useEffect(() => {
    fetchUserData();
  }, [isPortalOpen]);
  return (
    <>
      <section className="md:flex md:justify-center">
        <div className="flex flex-col justify-end gap-8 pt-24 px-3 pb-8 border-b border-black md:w-[90%] md:flex-row md:justify-between md:items-center lg:w-[80%]">
          <div className="flex space-x-2">
            <div className="flex items-center">
              <img
                src={userDetails.profileImage}
                alt="User_Regular"
                className="h-8 w-8 p-1 rounded-full md:h-12 md:w-12 border border-black"
              />
            </div>

            <div className="flex justify-between items-center w-full pr-2 md:justify-start md:space-x-4">
              <div>
                <p>{userDetails.name.slice(0, 5)}***</p>
                <p>{`${userDetails.email.slice(
                  0,
                  3
                )}*** ${userDetails.email.slice(
                  userDetails.email.length - 5,
                  userDetails.email.length
                )}`}</p>
              </div>
              <button
                className="text-waterGreen bg-greyishBlue py-1 px-2 shadow-lg rounded-lg active:scale-95 "
                onClick={tooglePortal}
              >
                <img
                  src={Edit_Regular}
                  alt="Edit_Regular"
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
          <div className=" py-1 w-full flex flex-col items-center !m-0 md:px-2 ">
            <button
              onClick={handleDeleteUser}
              className="text-red-800 bg-red-300 font-bold active:scale-105 w-full"
            >
              Delete account
            </button>
            <p className="font-sm text-red-500">{message}</p>
          </div>
        </div>
        <Portal isOpen={isPortalOpen}>
          <EditPortal isPortalOpen={isPortalOpen} tooglePortal={tooglePortal} />
        </Portal>
      </section>
    </>
  );
};

export default UserInfo;
