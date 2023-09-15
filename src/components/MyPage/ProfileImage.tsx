const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  return (
    <section>
      <div>
        <button className="w-[100px] h-[100px]">
          {profileImage ? (
            <img src={profileImage} alt="프로필 이미지" />
          ) : (
            <p>이미지 준비중</p>
          )}
        </button>
      </div>
      <div className="mb-1">
        <button className=" h-8 w-32 bg-yellow-500 text-white rounded-lg">
          이미지 업로드
        </button>
      </div>
      <div>
        <button className=" w-32 text-yellow-500">이미지 제거</button>
      </div>
    </section>
  );
};

export default ProfileImage;
