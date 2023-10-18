import { useEffect } from 'react';
import axiosInstance from '../../api/apiInstance';
import ProfileImage from '../../components/MyPage/ProfileImage';
import NickName from '../../components/MyPage/NickName';
import Email from '../../components/MyPage/Email';
import { useDispatch, useSelector } from 'react-redux';
import { UserMyInfo, loginAction, logoutAction } from '../../redux/module/user';
import { RootState } from '../../redux/module';
import EmailNotification from '../../components/MyPage/EmailNotification';
import AccountDeletion from '../../components/MyPage/AccountDeletion';
import Header from '../../components/Commons/Header';
// import SNSInfo from '../../components/MyPage/SNSInfo';
import { VscMail } from 'react-icons/vsc';
import { IoEarthSharp, IoNotificationsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
// import EmailNotification from '../../components/MyPage/EmailNotification';

// TODO
// axiosInstance + /v1/users/me
// 1. 사용자의 이미지 업로드 기능 get,patch
// 2. 이미지 제거 버튼 클릭 시 기본 이미지로 업데이트 patch
// 3. 사용자가 사용할 닉네임(가명), 수정 버튼을 눌렀을 시에는 get,patch
// 4. 소셜 정보 - 추가 삭제가 가능하며 현재 지원X, alert 출력 get
// 5. 등록된 이메일 주소 보여주기 get
// 6. 이메일 수신 설정 patch
// 7. 회원 탈퇴 delete
// redux말고 state로 관리

const MyPage = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userData) {
      axiosInstance
        .get<UserMyInfo>('/v1/users/me')
        .then((response) => {
          if (response && response.data) dispatch(loginAction(response.data));
        })
        .catch((error) => {
          console.log('마이페이지 데이터 fetching 중 에러: ', error);
        });
    }
  }, [userData, dispatch]);

  // const handleLogout = () => {
  //   dispatch(logoutAction());
  // };

  return (
    <article className="h-screen flex flex-col justify-center items-center">
      <header>
        <Header
          showTitle={true}
          showBackButtonIcon={false}
          showSearch={false}
          showMainHeaderButton={true}
          showHamburgerButton={true}
        />
      </header>
      <main className="flex w-full items-center justify-center">
        <section className="bg-white w-1/6 h-full rounded-xl flex-row items-center justify-start text-center">
          <div className="m-10">
            <section className="flex justify-center items-center border-b-2">
              {userData ? (
                <ProfileImage profileImage={userData.profileImage} />
              ) : (
                <p className="mb-10 flex justify-center items-center rounded-full border-2 w-[150px] h-[150px]">
                  No image
                </p>
              )}
            </section>
            <section className="font-black text-[20px] mt-10 mb-20">
              {userData ? (
                <NickName nickname={userData.nickname} />
              ) : (
                <Link to="/login">로그인하러 가기</Link>
              )}
            </section>
          </div>
        </section>
        <section className="bg-white w-1/2 h-full rounded-xl my-12">
          <div className="flex-row justify-center items-center">
            <ul>
              <li>
                {userData ? (
                  <NickName nickname={userData.nickname} />
                ) : (
                  <p className="text-xl font-semibold mr-8">닉네임 준비중</p>
                )}
              </li>
            </ul>
            <ul className="flex">
              <li className="flex items-center justify-center">
                <IoEarthSharp size={26} />
              </li>
              <li className="text-xl font-semibold mr-8">소셜 정보</li>
              {/* {userData ? (
                <SNSInfo email={userData.email} />
              ) : (
                <p className="mr-8">SNS 준비중</p>
              )} */}
            </ul>
            <ul className="flex">
              <li className="flex items-center justify-center">
                <VscMail size={26} />
                <li className="text-xl font-semibold mr-8">이메일 주소</li>
              </li>
              <div>
                <li>
                  {userData ? (
                    <Email email={userData.email} />
                  ) : (
                    <p>이메일 준비중</p>
                  )}
                </li>
                <li>회원 인증 또는 시스템에서 이메일을 수신하는 주소입니다.</li>
              </div>
            </ul>
            <ul>
              <li>
                {userData ? (
                  <EmailNotification
                    commentAlarm={userData.commentAlarm}
                    updateAlarm={userData.updateAlarm}
                  />
                ) : (
                  <div className="flex">
                    <IoNotificationsOutline size={26} />
                    <p className="text-xl font-semibold mr-8">
                      이메일 수신 설정
                    </p>
                  </div>
                )}
              </li>
            </ul>
            <AccountDeletion />
          </div>
        </section>
      </main>
    </article>
  );
};

export default MyPage;
