import { useState } from 'react';
import axiosInstance from '../../api/apiInstance';
import { User } from '@to1step/propose-backend';

// TODO
// axiosInstance + /v1/users/me
// 1. 사용자의 이미지 업로드 기능 get,patch
// 2. 이미지 제거 버튼 클릭 시 기본 이미지로 업데이트 patch
// 3. 사용자가 사용할 닉네임(가명), 수정 버튼을 눌렀을 시에는 get,patch
// 4. 소셜 정보 - 추가 삭제가 가능하며 현재 지원X, alert 출력 get
// 5. 등록된 이메일 주소 보여주기 get
// 6. 이메일 수신 설정 patch
// 7. 회원 탈퇴 delete

const MyPage = () => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <div className="bg-white">
      <div className="flex border-2">
        <section className="flex-row border-r-8">
          {/* 이미지 컴포넌트 분리 */}
          <div>
            <button>이미지</button>
          </div>
          <div>
            <button className="bg-yellow-500">이미지 업로드</button>
          </div>
          <div>
            <button className="bg-yellow-500">이미지 제거</button>
          </div>
        </section>
        <section>
          {/* 닉네임 컴포넌트 분리 */}
          <p>닉네임</p>
        </section>
      </div>
      <section>
        <ul className="flex">
          {/* 닉네임 컴포넌트 분리 */}
          <li>닉네임</li>
          <li>나는 코맛집</li>
          <li>
            <button className="underline">수정</button>
          </li>
        </ul>
        <ul className="flex">
          {/* 소셜 정보 컴포넌트 분리 */}
          <li>소셜 정보</li>
          <div className="flex-row">
            <li>가입 이메일</li>
            <li>가입 구글 이메일</li>
            <li>가입 카카오 이메일</li>
          </div>
          <li>
            <button className="underline">수정</button>
          </li>
        </ul>
        <ul className="flex">
          {/* 이메일 정보 컴포넌트 분리 */}
          <li>이메일 주소</li>
          <li>abc@komatzip.com</li>
        </ul>
        <ul className="flex">
          {/* 이메일 알람 수신 설정 컴포넌트 분리 */}
          <li>이메일 수신 설정</li>
          <div className="flex-row">
            <div className="flex">
              <li>댓글 알림</li>
              <li>댓글 알림 토글</li>
            </div>
            <div className="flex">
              <li>업데이트 소식</li>
              <li>업데이트 소식 토글</li>
            </div>
          </div>
        </ul>
        <ul className="flex">
          {/* 회원 탈퇴 컴포넌트 분리 */}
          <li>회원 탈퇴</li>
          <li>
            <button className="bg-yellow-500">회원 탈퇴</button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default MyPage;
