import { useEffect } from 'react';
import axiosInstance from '../../api/apiInstance';
import ProfileImage from '../../components/MyPage/ProfileImage';
import NickName from '../../components/MyPage/NickName';
import Email from '../../components/MyPage/Email';
import { useDispatch, useSelector } from 'react-redux';
import { UserMyInfo, loginAction, logoutAction } from '../../redux/module/user';
import { RootState } from '../../redux/module';
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
    axiosInstance
      .get<UserMyInfo>('/v1/users/me')
      .then((response) => {
        if (response && response.data) dispatch(loginAction(response.data));
      })
      .catch((error) => {
        console.log('마이페이지 데이터 fetching 중 에러: ', error);
      });
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <main className="bg-white w-3/4 flex-row items-center justify-center">
      <div className="mx-20 my-12">
        <div className="flex items-center justify-start mb-8">
          <section className="w-1/4 my-4 mx-8 border-r-2">
            {userData ? (
              <ProfileImage profileImage={userData.profileImage} />
            ) : (
              <p>이미지 준비중</p>
            )}
          </section>
          <section className="font-black text-[30px] font-left ml-4">
            {userData ? (
              <NickName nickname={userData.nickname} />
            ) : (
              <p>이미지 준비중</p>
            )}
          </section>
        </div>
        <section>
          <ul>
            <li>
              {userData ? (
                <NickName nickname={userData.nickname} />
              ) : (
                <p>닉네임 준비중</p>
              )}
            </li>
          </ul>
          <ul className="flex">
            {/* 소셜 정보 컴포넌트 분리 */}
            <li>소셜 정보</li>
            <div className="flex-row">
              <li>
                {userData && userData.provider === 'local' ? (
                  <div>
                    <p>가입 이메일 : </p>
                    <Email email={userData.email} />
                  </div>
                ) : (
                  <p>가입 이메일</p>
                )}
              </li>
              <li>가입 구글 이메일</li>
              <li>
                {userData && userData.provider === 'kakao' ? (
                  <div className="flex">
                    <p>가입 카카오 이메일 : </p>
                    <Email email={userData.email} />
                  </div>
                ) : (
                  <p>가입 카카오 이메일</p>
                )}
              </li>
              <li>
                포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다.
              </li>
            </div>
            <li>
              <button className="underline">수정</button>
            </li>
          </ul>
          <ul className="flex">
            {/* 이메일 정보 컴포넌트 분리 */}
            <li>이메일 주소</li>
            <li>
              {userData ? (
                <Email email={userData.email} />
              ) : (
                <p>이메일 준비중</p>
              )}
            </li>
            <li>회원 인증 또는 시스템에서 이메일을 수신하는 주소입니다.</li>
          </ul>
          <ul>
            {/* <li> */}
            {/* {userData ? (
                <EmailNotification
                  commentAlarm={userData.commentAlarm}
                  updateAlarm={userData.updateAlarm}
                />
              ) : (
                <p>이메일 수신 설정 준비중</p>
              )}
            </li> */}
          </ul>
          <ul className="flex">
            <li>회원 탈퇴</li>
            <li>
              <button className="bg-yellow-500">회원 탈퇴</button>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default MyPage;
