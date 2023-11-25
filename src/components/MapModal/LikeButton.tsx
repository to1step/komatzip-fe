import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { StoreEntireInfo } from '@to1step/propose-backend';

interface LikeButtonProps {
  markerInfo: StoreEntireInfo;
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
            await axios.post(
              `/api/v1/stores/${markerInfo.uuid}/like`,
              null,
              {},
            );
          } else if (!markerLike && markerInfo) {
            await axios.delete(`/api/v1/stores/${markerInfo.uuid}/like`, {});
          }
          localStorage.setItem(
            `like-${markerInfo.uuid}`,
            markerLike.toString(),
          );
        } catch (e) {
          console.log(e);
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
