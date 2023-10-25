import axiosInstance from '../../api/apiInstance';

const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files[0];

    if (!file) {
      console.log('🌼 선택된 이미지 파일 없음');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.post('/v1/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.imageUrl) {
        console.log('이미지 업로드 완료!', response.data.imageUrl);
      }
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section className="bg-blue-400 flex-row justify-center items-center text-center">
      <div className="my-10 flex justify-center items-center rounded-full border-2 w-[150px] h-[150px]">
        <img src={profileImage} alt="프로필 이미지" />
      </div>
      <div className="mb-4">
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
        <button className=" w-32 text-yellow-500">이미지 제거</button>
      </div>
    </section>
  );
};

export default ProfileImage;
