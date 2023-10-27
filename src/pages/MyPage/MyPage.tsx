import { useEffect } from 'react';
import axiosInstance from '../../api/apiInstance';
import ProfileImage from '../../components/MyPage/ProfileImage';
import NickName from '../../components/MyPage/NickName';
import Email from '../../components/MyPage/Email';
import { useDispatch, useSelector } from 'react-redux';
import { UserMyInfo, loginAction } from '../../redux/module/user';
import { RootState } from '../../redux/module';
// import EmailNotification from '../../components/MyPage/EmailNotification';
import AccountDeletion from '../../components/MyPage/AccountDeletion';
import Header from '../../components/Commons/Header';
// import SNSInfo from '../../components/MyPage/SNSInfo';
import { VscMail } from 'react-icons/vsc';
import { IoEarthSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      axiosInstance
        .get<UserMyInfo>('/v1/users/me')
        .then((response) => {
          if (response && response.data) {
            dispatch(loginAction(response.data));
            console.log('🌼 마이페이지 정보', response.data);
          } else {
            navigate('/');
          }
        })
        .catch((error) => {
          console.log('마이페이지 데이터 fetching 중 에러: ', error);
          navigate('/');
        });
    }
  }, [userData, dispatch, navigate]);

  // const handleLogout = () => {
  //   dispatch(logoutAction());
  // };

  return (
    <article className="h-screen flex flex-col justify-center items-center">
      <header className="w-full">
        <Header
          showTitle={true}
          showBackButtonIcon={false}
          showSearch={false}
          showMainHeaderButton={true}
          showHamburgerButton={true}
        />
      </header>
      <main className="w-3/4 flex-row justify-center items-center">
        <section className="bg-white rounded-3xl">
          <div>
            <section>
              {userData ? (
                <ProfileImage profileImage={userData.profileImage} />
              ) : (
                <p className="mb-10 flex justify-center items-center rounded-full  w-[150px] h-[150px]">
                  No image
                </p>
              )}
            </section>
            <section className="font-black text-[20px] mt-4 text-center">
              {userData ? (
                <NickName
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
        <section className="bg-white rounded-2xl my-8">
          <h1 className="text-center text-3xl font-black ">내 정보</h1>
          <ul>
            <li className="flex-row">
              {userData ? (
                <NickName
                  nickname={userData.nickname}
                  commentAlarm={userData.commentAlarm}
                  updateAlarm={userData.updateAlarm}
                />
              ) : (
                <p className="text-xl font-semibold mr-8">닉네임 준비중</p>
              )}
            </li>
          </ul>
          <ul className="flex m-4">
            <li className="flex items-center justify-center mx-4">
              <IoEarthSharp size={26} />
            </li>
            <li className="text-xl font-semibold mr-8">소셜 정보</li>
            {/* {userData ? (
                <SNSInfo email={userData.email} />
              ) : (
                <p className="mr-8">SNS 준비중</p>
              )} */}
          </ul>
          <ul className="flex m-4">
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
          <ul>
            {/* <li>
              {userData ? (
                <EmailNotification
                  commentAlarm={userData.commentAlarm}
                  updateAlarm={userData.updateAlarm}
                  onCommentAlarmToggle={userData.commentAlarm}
                  onUpdateAlarmToggle={userData.updateAlarm}
                />
              ) : (
                <div className="flex">
                  <IoNotificationsOutline size={26} />
                  <p className="text-xl font-semibold mr-8">이메일 수신 설정</p>
                </div>
              )}
            </li> */}
          </ul>
          <AccountDeletion />
        </section>
      </main>
    </article>
  );
};

export default MyPage;
