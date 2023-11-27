import { IoCamera } from 'react-icons/io5';
import axiosInstance from '../../api/apiInstance';
import { UserMyInfo } from '../../redux/module/user';

export interface IProps {
  userData: UserMyInfo;
  updateProfile: (img: string) => void;
}
const ProfileImage = ({ userData, updateProfile }: IProps) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const images = event.target.files && event.target.files[0];

    if (!images) {
      console.log('🌼 선택된 이미지 파일 없음');
      return;
    }

    const formData = new FormData();
    formData.append('images', images);

    try {
      const response = await axiosInstance.post('/v1/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.imageLocationList[0]) {
        axiosInstance.patch('/v1/users/me', {
          nickname: userData.nickname,
          profileImage: response.data.imageLocationList[0],
          commentAlarm: userData.commentAlarm,
          updateAlarm: userData.updateAlarm,
        });

        console.log('이미지 업로드 완료!', response.data.imageLocationList[0]);
        updateProfile(response.data.imageLocationList[0]);
      }
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section>
      <div className="bg-blue-300 rounded-full border-2 w-[150px] h-[150px] flex justify-center items-center">
        {userData.profileImage && (
          <img src={userData.profileImage} alt="프로필 이미지" />
        )}
      </div>
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
          className="w-32 bg-yellow-500 text-white rounded-full text-center"
        >
          <IoCamera size={35} />
        </label>
      </div>
    </section>
  );
};

export default ProfileImage;
