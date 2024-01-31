import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { useState, useEffect } from 'react';
import SideBar from '../Sidebar/SideBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import { logoutAction } from '../../redux/module/user';
import axiosInstance from '../../api/apiInstance';
import { removeCookie } from '../../util/cookie.util';

interface HeaderProps {
  showTitle?: boolean;
  showBackButtonIcon?: boolean;
  showSearch?: boolean;
  showMainHeaderButton?: boolean;
  showHamburgerButton?: boolean;
}

const Header = ({
  showTitle = true, // 여기가 수도권 큰 로고버튼
  showBackButtonIcon = false, // 뒤로가기 버튼
  showSearch = false, // 검색창 및 맵페이지 연결 버튼
  showMainHeaderButton = true, // 로그인, 마이페이지 버튼
  showHamburgerButton = false, // 햄버거버튼
}: HeaderProps) => {
  const myInfo = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);

  const handleLogout = async () => {
    try {
      // 로그아웃 정상적으로 처리 되었다면 상태 변경 후 메인으로 페이지 이동
      await axiosInstance.post('/v1/auth/sign-out');
      dispatch(logoutAction());
      removeCookie();

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    setIsBackdropVisible(!isBackdropVisible);
  };

  const handleBackdropClick = () => {
    setIsSideBarOpen(false); // 사이드바 닫기
    setIsBackdropVisible(false); // 백드롭 숨기기
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // 백드롭 상태 변경 시 사이드바 닫기
  useEffect(() => {
    if (!isBackdropVisible) {
      setIsSideBarOpen(false);
    }
  }, [isBackdropVisible]);

  return (
    <header>
      <nav className="flex justify-between items-right">
        {showBackButtonIcon ? (
          <IoIosArrowBack
            onClick={handleBackClick}
            className="text-[50px] text-orange-200 hover:text-orange-900 ml-20 cursor-pointer"
          />
        ) : (
          <div style={{ width: 'auto' }}></div>
        )}
        <section className="flex">
          {showMainHeaderButton &&
            (myInfo?.isLoggedIn ? (
              <>
                <Link
                  to="/mypage"
                  className="text-xl my-[30px] mr-[50px] text-orange-200 font-semibold hover:text-orange-900 invisible md:visible"
                >
                  My Page
                </Link>
                <span
                  className="text-xl my-[30px] mx-[70px] text-orange-200 font-semibold hover:text-orange-900 cursor-pointer invisible md:visible"
                  onClick={() => handleLogout()}
                >
                  Logout
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xl my-[30px] mx-[70px] text-orange-200 font-semibold hover:text-orange-900"
                >
                  Login
                </Link>
              </>
            ))}

          {showHamburgerButton && (
            <div className="flex items-center">
              <GiHamburgerMenu
                className="text-4xl cursor-pointer mr-5 text-orange-200 "
                onClick={toggleSideBar}
              />
            </div>
          )}
        </section>
      </nav>
      {showTitle && (
        <h1 className="text-center mb-10">
          <Link
            to="/"
            className="text-4xl md:text-7xl font-bold text-orange-200 font-custom-snow-crab"
          >
            여기가 수도권
          </Link>
        </h1>
      )}
      {showSearch && <Search />}
      {isBackdropVisible && (
        <div // 백드롭
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-20"
          onClick={handleBackdropClick} // 백드롭 클릭 시 닫기
        />
      )}
      {isSideBarOpen && <SideBar onClose={toggleSideBar} />}
    </header>
  );
};

export default Header;
