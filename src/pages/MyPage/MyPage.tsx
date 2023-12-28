import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../api/apiInstance';
import ProfileImage from '../../components/MyPage/ProfileImage';
import NickName from '../../components/MyPage/NickName';
import Email from '../../components/MyPage/Email';
import { useDispatch, useSelector } from 'react-redux';
import { UserMyInfo, loginAction } from '../../redux/module/user';
import { RootState } from '../../redux/module';
import AccountDeletion from '../../components/MyPage/AccountDeletion';
import Header from '../../components/Commons/Header';
import { VscMail } from 'react-icons/vsc';
import {
  IoAlertCircleOutline,
  IoEarthSharp,
  IoHeartSharp,
} from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import StoreRegistrationModal from '../../components/Modal/StoreRegistrationModal/StoreRegistrationModal';

const MyPage = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('내 정보');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  useEffect(() => {
    if (!userData) {
      axiosInstance
        .get<UserMyInfo>('/v1/users/me')
        .then((response) => {
          if (response && response.data) {
            dispatch(loginAction(response.data));
          } else {
            navigate('/');
          }
        })
        .catch(() => {
          navigate('/');
        });
    }
  }, [userData, dispatch, navigate]);

  const updateProfile = (img: string) => {
    if (!userData) return;

    dispatch(
      loginAction({
        ...userData,
        profileImage: img,
      }),
    );
  };

  return (
    <article className="relative flex flex-col justify-center items-center">
      <header className="w-full">
        <Header
          showTitle={true}
          showBackButtonIcon={false}
          showSearch={false}
          showMainHeaderButton={true}
          showHamburgerButton={true}
        />
      </header>
      <main className="w-3/4 flex-row justify-center items-center h-screen relative">
        <section className="bg-white rounded-3xl">
          <div className="flex flex-col justify-center items-center mx-4 mb-4 h-[280px]">
            <section>
              {userData ? (
                <div>
                  <ProfileImage
                    userData={userData}
                    updateProfile={updateProfile}
                  />
                </div>
              ) : (
                <p className="rounded-full border-2 w-[150px] h-[150px] flex justify-center items-center">
                  No image
                </p>
              )}
            </section>
            <section className="mt-8">
              {userData ? (
                <NickName
                  key={selectedTab}
                  nickname={userData.nickname}
                  commentAlarm={userData.commentAlarm}
                  updateAlarm={userData.updateAlarm}
                />
              ) : (
                <Link to="/login">로그인하러 가기</Link>
              )}
            </section>
          </div>
        </section>
        <section className="h-3/4 relative">
          <section className="mt-8">
            <section className="flex ">
              <button
                className={
                  selectedTab === '내 정보'
                    ? 'bg-yellow-400 w-1/3 text-center rounded-t-2xl bg-opacity-70'
                    : 'bg-yellow-300 w-1/3 text-center rounded-t-2xl bg-opacity-40'
                }
                onClick={() => handleTabClick('내 정보')}
              ></button>
              <div
                className={`${
                  selectedTab === '내 코스'
                    ? 'bg-yellow-400 '
                    : 'bg-yellow-300 '
                } rounded-t-2xl text-center w-1/3 ${
                  selectedTab === '내 코스' ? 'bg-opacity-70' : 'bg-opacity-60'
                }`}
                onClick={() => handleTabClick('내 코스')}
              >
                <button>내 코스</button>
              </div>
              <div
                className={
                  selectedTab === '내 가게'
                    ? 'bg-yellow-400 rounded-t-2xl text-center w-1/3 bg-opacity-70'
                    : 'bg-yellow-300 rounded-t-2xl text-center w-1/3 bg-opacity-30'
                }
                onClick={() => handleTabClick('내 가게')}
              >
                <button>내 가게</button>
              </div>
            </section>
          </section>
          <section className="bg-white rounded-b-2xl relative z-10">
            {selectedTab === '내 정보' && (
              <section className="w-2/3 flex flex-col items-start m-auto">
                <ul className="flex mx-4 my-6">
                  <li className="flex items-center justify-center mx-4 mt-8">
                    <div className="mr-4">
                      <IoHeartSharp size={26} />
                    </div>
                    {userData ? (
                      <div className="flex ">
                        <p className="text-xl font-semibold mr-20">닉네임</p>
                        <NickName
                          nickname={userData.nickname}
                          commentAlarm={userData.commentAlarm}
                          updateAlarm={userData.updateAlarm}
                        />
                      </div>
                    ) : (
                      <Link to="/login">로그인하러 가기</Link>
                    )}
                  </li>
                </ul>
                <ul className="flex mx-4 my-6">
                  <li className="flex items-center justify-center mx-4 ">
                    <IoEarthSharp size={26} />
                  </li>
                  <li className="text-xl font-semibold mr-8">소셜 정보</li>
                </ul>
                <ul className="flex mx-4 my-6">
                  <div className="flex items-center justify-center ml-4">
                    <li className="mr-4">
                      <VscMail size={26} />
                    </li>
                    <li className="text-xl font-semibold mr-8">이메일 주소</li>
                  </div>
                  <div>
                    <li>
                      {userData ? (
                        <Email email={userData.email} />
                      ) : (
                        <p>이메일 준비중</p>
                      )}
                    </li>
                    <li className="text-[11px] text-slate-400 mt-1">
                      회원 인증 또는 시스템에서 이메일을 수신하는 주소입니다.
                    </li>
                  </div>
                </ul>
                <ul></ul>
                <AccountDeletion />
              </section>
            )}
            {selectedTab === '내 코스' && (
              <section className="h-[300px] w-2/3 flex flex-col items-center justify-center m-auto">
                <div>
                  <IoAlertCircleOutline size={26} />
                </div>
                <h3>등록된 코스가 없습니다.</h3>
                <button className="font-semibold">등록하러 가기</button>
              </section>
            )}
            {selectedTab === '내 가게' && (
              <section className="h-[300px] w-2/3 flex flex-col items-center justify-center m-auto relative z-0">
                <div>
                  <IoAlertCircleOutline size={26} />
                  <h3>등록된 가게가 없습니다.</h3>
                  <button onClick={() => openModal()} className="font-semibold">
                    등록하러 가기
                  </button>
                </div>
                {isModalOpen && (
                  <StoreRegistrationModal closeModal={closeModal} />
                )}
              </section>
            )}
          </section>
        </section>
      </main>
    </article>
  );
};

export default MyPage;
