import { useEffect, useState } from 'react';
import axiosInstance from '../../api/apiInstance'; // axiosInstance를 가져옴
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Store, StoreEntireInfo } from '@to1step/propose-backend';

interface LikeButtonProps {
  markerInfo: StoreEntireInfo | Store;
}

const LikeButton = ({ markerInfo }: LikeButtonProps) => {
  const initialLikeState = localStorage.getItem(`like-${markerInfo.uuid}`);
  const [isClickLike, setIsClickLike] = useState(false);
  const [markerLike, setMarkerLike] = useState(
    initialLikeState === 'true' || false,
  );

  useEffect(() => {
    if (isClickLike) {
      // 서버에 좋아요 정보 업데이트
      const saveUserLike = async () => {
        try {
          if (markerLike && markerInfo) {
            // axiosInstance를 사용하여 API 요청을 처리
            await axiosInstance.post(`/v1/stores/${markerInfo.uuid}/like`);
          } else if (!markerLike && markerInfo) {
            // axiosInstance를 사용하여 API 요청을 처리
            await axiosInstance.delete(
              `/v1/stores/${markerInfo.uuid}/like`,
              {},
            );
          }
          localStorage.setItem(
            `like-${markerInfo.uuid}`,
            markerLike.toString(),
          );
        } catch (e) {
          console.error('An error occurred while updating likes:', e);
        }
        setIsClickLike(false);
      };

      saveUserLike();
    }
  }, [markerLike, isClickLike, markerInfo]);

  const handleClickLike = () => {
    setIsClickLike(true);
    setMarkerLike((prevState) => !prevState);
  };

  return (
    <span onClick={handleClickLike}>
      {markerLike ? (
        <AiFillHeart size="24" color="#FF3257" />
      ) : (
        <AiOutlineHeart size="24" color="#FF3257" />
      )}
    </span>
  );
};

export default LikeButton;
