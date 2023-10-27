import Email from './Email';

interface UserData {
  provider: string;
  email: string;
}
const SNSInfo = ({ userData }: { userData: UserData }) => {
  return (
    <>
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
            <p>등록된 카카오 이메일이 없습니다.</p>
          )}
        </li>
        <li className="text-sm">
          포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다.
        </li>
      </div>
      <li>
        <button className="underline">수정</button>
      </li>
    </>
  );
};

export default SNSInfo;
