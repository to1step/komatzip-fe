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
<<<<<<< HEAD
    const files = event.target.files;

    if (!files || files.length === 0) {
=======
    const images = event.target.files && event.target.files[0];

    if (!images) {
>>>>>>> b82028010723d5734b12d922c6759492deb1f204
      console.log('🌼 선택된 이미지 파일 없음');
      return;
    }

    const formData = new FormData();
<<<<<<< HEAD
    formData.append('file', files[0]);
=======
    formData.append('images', images);
>>>>>>> b82028010723d5734b12d922c6759492deb1f204

    try {
      const response = await axiosInstance.post('/v1/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

<<<<<<< HEAD
      if (response.data && response.data.imageUrl) {
        console.log('😥 이미지 업로드 완료!', response.data.imageUrl);
=======
      if (response.data && response.data.imageLocationList[0]) {
        axiosInstance.patch('/v1/users/me', {
          nickname: userData.nickname,
          profileImage: response.data.imageLocationList[0],
          commentAlarm: userData.commentAlarm,
          updateAlarm: userData.updateAlarm,
        });

        console.log('이미지 업로드 완료!', response.data.imageLocationList[0]);
        updateProfile(response.data.imageLocationList[0]);
>>>>>>> b82028010723d5734b12d922c6759492deb1f204
      }
    } catch (error) {
      console.error('😥 이미지 업로드 실패', error);
    }
  };

  return (
    <section>
<<<<<<< HEAD
      {profileImage && (
        <img
          src={profileImage}
          alt="프로필 이미지"
          className="rounded-full border-2 w-[150px] h-[150px] flex justify-center items-center"
        />
      )}
=======
      <div className="bg-blue-300 rounded-full border-2 w-[150px] h-[150px] flex justify-center items-center">
        {userData.profileImage && (
          <img src={userData.profileImage} alt="프로필 이미지" />
        )}
      </div>
>>>>>>> b82028010723d5734b12d922c6759492deb1f204
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
