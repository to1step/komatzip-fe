import { IoCamera } from 'react-icons/io5';
import axiosInstance from '../../api/apiInstance';
import { UserMyInfo } from '../../redux/module/user';
import { success } from '../../util/toastify';

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

        success('프로필 업로드 완료!');
        updateProfile(response.data.imageLocationList[0]);
      }
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section className="relative">
      <div className="w-[150px] h-[150px] relative">
        {userData.profileImage ? (
          <img
            src={userData.profileImage}
            alt="프로필 이미지"
            className="w-full h-full object-cover rounded-full border-2 "
          />
        ) : (
          <img
            src="/images/default_profile.png"
            alt="프로필 이미지"
            className="w-full h-full object-cover rounded-full border-2 "
          />
        )}
      </div>
      <div className="flex absolute top-12 left-10 m-2">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          id="imageUploadInput"
        />
        <label
          htmlFor="imageUploadInput"
          className="bg-yellow-500 text-white rounded-full text-center"
        >
          <IoCamera size={35} />
        </label>
      </div>
    </section>
  );
};

export default ProfileImage;
