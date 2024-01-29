import { useCallback, useState } from 'react';
import axiosInstance from '../../api/apiInstance';
import ProfileImage from '../../components/MyPage/ProfileImage';
import NickName from '../../components/MyPage/NickName';
import Email from '../../components/MyPage/Email';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/module/user';
import { RootState } from '../../redux/module';
import AccountDeletion from '../../components/MyPage/AccountDeletion';
import Header from '../../components/Commons/Header';
import { VscMail } from 'react-icons/vsc';
import {
  IoAlertCircleOutline,
  IoEarthSharp,
  IoHeartSharp,
} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SelectedStoreList from '../../components/MyPage/SelectedStoreList';

const MyPage = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState('내 정보');
  const [storeData, setStoreData] = useState(null);

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);

    if (tabName === '내 가게') {
      fetchStoreListData();
    }
  };

  // const fetchUserData = useCallback(() => {
  //   if (!userData) {
  //     navigate('/');
  //   }
  // }, [userData, navigate]);

  const fetchStoreListData = useCallback(() => {
    axiosInstance
      .get('/v1/stores/me')
      .then((response) => {
        setStoreData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching store data:', error);
      })
      .finally(() => {});
  }, []);

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
      <main className="flex-row justify-center items-center h-screen relative">
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
                  profileImage={userData.profileImage}
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
              >
                내 정보
              </button>
              <button
                className={`${
                  selectedTab === '내 코스'
                    ? 'bg-yellow-400 '
                    : 'bg-yellow-300 '
                } rounded-t-2xl text-center w-1/3 ${
                  selectedTab === '내 코스' ? 'bg-opacity-70' : 'bg-opacity-60'
                }`}
                onClick={() => handleTabClick('내 코스')}
              >
                내 코스
              </button>
              <button
                className={
                  selectedTab === '내 가게'
                    ? 'bg-yellow-400 rounded-t-2xl text-center w-1/3 bg-opacity-70'
                    : 'bg-yellow-300 rounded-t-2xl text-center w-1/3 bg-opacity-30'
                }
                onClick={() => handleTabClick('내 가게')}
              >
                내 가게
              </button>
            </section>
          </section>
          <section className="bg-white rounded-b-2xl flex flex-col">
            {selectedTab === '내 정보' && (
              <section className="flex flex-col items-start">
                <ul className="flex my-6">
                  <li className="flex items-center justify-center mx-4 mt-8">
                    <div className="mx-4">
                      <IoHeartSharp size={26} />
                    </div>
                    {userData ? (
                      <div className="flex">
                        <p className="text-xs md:text-xl font-semibold mr-20">
                          닉네임
                        </p>
                        <NickName
                          nickname={userData.nickname}
                          commentAlarm={userData.commentAlarm}
                          updateAlarm={userData.updateAlarm}
                          profileImage={userData.profileImage}
                        />
                      </div>
                    ) : (
                      <Link to="/login">로그인하러 가기</Link>
                    )}
                  </li>
                </ul>
                <ul className="flex my-6">
                  <div className="flex items-center justify-center ml-4 w-full">
                    <li className="mx-4">
                      <IoEarthSharp size={26} />
                    </li>
                    <li className="text-xs md:text-xl font-semibold mr-4">
                      소셜 정보
                    </li>
                  </div>
                </ul>
                <ul className="flex my-6">
                  <div className="flex items-center justify-center ml-4">
                    <li className="mx-4">
                      <VscMail size={26} />
                    </li>
                    <li className="text-xs md:text-xl font-semibold mr-4">
                      이메일 주소
                    </li>
                  </div>
                  <div className="ml-8 mr-4">
                    <li className="text-xs md:text-l">
                      {userData ? (
                        <Email email={userData.email} />
                      ) : (
                        <p>이메일 준비중</p>
                      )}
                    </li>
                    <li className="text-[6px] md:text-l text-slate-400">
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
              <SelectedStoreList storeData={storeData} />
            )}
          </section>
        </section>
      </main>
    </article>
  );
};

export default MyPage;
