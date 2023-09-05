import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { StoreEntireInfo } from '@to1step/propose-backend';
interface LikeButtonProps {
  markerLike: boolean;
  markerInfo: StoreEntireInfo;
  token: string | null;
}

const LikeButton: React.FC<LikeButtonProps> = ({ markerInfo, token }) => {
  const [userLike, setUserLike] = useState<boolean>(false);
  const [isClickLike, setIsClickLike] = useState<boolean>(false);
  const [markerLike, setMarkerLike] = useState<boolean>(
    (markerInfo && markerInfo.iLike) || false,
  );

  useEffect(() => {
    const saveUserLike = async () => {
      try {
        if (markerLike && markerInfo) {
          await axios.post(
            `https://api.to1step.shop/v1/stores/${markerInfo.uuid}/like`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } else if (!markerLike && markerInfo) {
          await axios.delete(
            `https://api.to1step.shop/v1/stores/${markerInfo.uuid}/like`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      } catch (e) {
        console.log(e);
      }
      setIsClickLike(false);
    };

    if (isClickLike) saveUserLike();
  }, [markerLike, isClickLike, markerInfo, token]);

  const handleClickLike = async () => {
    setIsClickLike(true);
    setMarkerLike((prevState) => !prevState);
  };

  return (
    <span onClick={handleClickLike}>
      {userLike ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
    </span>
  );
};

export default LikeButton;
