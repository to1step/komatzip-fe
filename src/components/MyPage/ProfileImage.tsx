import axiosInstance from '../../api/apiInstance';

const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  const handleImageUpload = async () => {
    try {
      const response = await axiosInstance.post('/v1/images');
      console.log('이미지 업로드 완료!', response);
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section>
      <div>
        <button className="w-[100px] h-[100px]">
          {profileImage ? (
            <img src={profileImage} alt="프로필 이미지" />
          ) : (
            <img
              src="/public/images/default_profile.jpg"
              alt="Default Profile"
            />
          )}
        </button>
      </div>
      <div className="mb-1">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          id="imageUploadInput"
        />
        <label
          htmlFor="imageUploadInput"
          className="h-8 w-32 bg-yellow-500 text-white rounded-lg"
        >
          이미지 업로드
        </label>
      </div>
      <div>
        <button className=" w-32 text-yellow-500">이미지 제거</button>
      </div>
    </section>
  );
};

export default ProfileImage;
