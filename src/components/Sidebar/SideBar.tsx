import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import { useEffect } from 'react';
import axiosInstance from '../../api/apiInstance';
import { UserMyInfo, loginAction, logoutAction } from '../../redux/module/user';
import { removeCookie } from '../../util/cookie.util';

type SideBarProps = {
  onClose: () => void;
};

function SideBar({ onClose }: SideBarProps) {
  const handleClose = () => {
    onClose();
  };
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/v1/auth/sign-out');
      dispatch(logoutAction());
      removeCookie();

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="mx-4">
          <FaTimes
            className="text-xl cursor-pointer text-white hover:text-orange-400"
            onClick={handleClose}
          />
        </div>
      </div>

      <div className="p-4 mr-2">
        <ul>
          <li className="mb-2">
            <Link to="/mypage" className="hover:text-orange-200">
              🍴 마이페이지
            </Link>
          </li>
          <span
            className="hover:text-orange-200 absolute bottom-0 right-0 m-6"
            onClick={() => handleLogout()}
          >
            👉🏻 로그아웃
          </span>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
