import { IoCamera } from 'react-icons/io5';
import axiosInstance from '../../api/apiInstance';

const ProfileImage = ({ profileImage }: { profileImage: string | null }) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      console.log('🌼 선택된 이미지 파일 없음');
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      const response = await axiosInstance.post('/v1/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.imageUrl) {
        console.log('😥 이미지 업로드 완료!', response.data.imageUrl);
      }
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section>
      {profileImage && (
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="rounded-full border-2 w-[150px] h-[150px] flex justify-center items-center"
        />
      )}
      <div className="my-2 flex flex-row justify-center items-center">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          id="imageUploadInput"
        />
        <label
          htmlFor="imageUploadInput"
          className="bg-slate-400 text-white rounded-full text-center cursor-pointer"
        >
          <IoCamera size={35} />
        </label>
      </div>
    </section>
  );
};

export default ProfileImage;
