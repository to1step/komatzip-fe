import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import { useState, useEffect } from 'react';
import SideBar from '../Sidebar/SideBar';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isBackdropVisible, setIsBackdropVisible] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
    setIsBackdropVisible(!isBackdropVisible);
  };

  const handleBackdropClick = () => {
    setIsSideBarOpen(false); // 사이드바 닫기
    setIsBackdropVisible(false); // 백드롭 숨기기
  };

  // 백드롭 상태 변경 시 사이드바 닫기
  useEffect(() => {
    if (!isBackdropVisible) {
      setIsSideBarOpen(false);
    }
  }, [isBackdropVisible]);

  return (
    <header>
      <nav className="flex-row justify-center items-center">
        <div className="flex-row justify-between items-center">
          <div className="flex justify-end mb-3">
            {isLoggedIn ? (
              <Link
                to="/logout"
                className="text-xl my-[30px] mx-[70px] text-orange-200 font-semibold hover:text-orange-900"
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xl my-[30px] mx-[70px] text-orange-200 font-semibold hover:text-orange-900"
              >
                Login
              </Link>
            )}
            <Link
              to="/mypage"
              className="text-xl my-[30px] mr-[50px] text-orange-200 font-semibold hover:text-orange-900"
            >
              My Page
            </Link>
            <div className="flex items-center">
              <GiHamburgerMenu
                className="text-4xl cursor-pointer mr-5 text-orange-200 hover:text-orange-900"
                onClick={toggleSideBar}
              />
            </div>
          </div>
          <h1 className="text-center mb-10">
            <Link
              to="/"
              className="text-7xl font-bold text-orange-200 font-custom-snow-crab"
            >
              여기가 수도권
            </Link>
          </h1>
        </div>
        <Search />
      </nav>
      {isBackdropVisible && (
        <div // 백드롭
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-10"
          onClick={handleBackdropClick} // 백드롭 클릭 시 닫기
        />
      )}
      {isSideBarOpen && <SideBar onClose={toggleSideBar} />}
    </header>
  );
};

export default Header;
