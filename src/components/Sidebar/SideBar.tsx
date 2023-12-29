import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import { useEffect } from 'react';
import axiosInstance from '../../api/apiInstance';
import { UserMyInfo, loginAction } from '../../redux/module/user';

type SideBarProps = {
  onClose: () => void;
};

function SideBar({ onClose }: SideBarProps) {
  const handleClose = () => {
    onClose();
  };
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      axiosInstance.get<UserMyInfo>('/v1/users/me').then((response) => {
        if (response && response.data) dispatch(loginAction(response.data));
      });
    }
  }, [userData, dispatch]);

  return (
    <div className="fixed z-30 top-0 right-0 h-full w-64 bg-black text-white shadow-md bg-opacity-60">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-0 text-orange-200">
          {userData ? `${userData.nickname}님` : '로그인 해주세요'}
        </h2>
        <div>
          <FaTimes
            className="text-2xl cursor-pointer text-white hover:text-orange-400"
            onClick={handleClose}
          />
        </div>
      </div>

      <div className="p-4">
        <ul>
          <li className="mb-2">
            <Link to="/mycourses" className="hover:text-orange-200">
              My Courses
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/mypage" className="hover:text-orange-200">
              About Me
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
