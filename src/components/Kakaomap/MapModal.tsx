import React, { useRef, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import axios from 'axios';

import { StoreEntireInfo } from '@to1step/propose-backend';

interface MapModalProps {
  markerInfo: StoreEntireInfo | null;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ markerInfo, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [userLike, setUserLike] = useState<boolean>(false);
  const [storeInfo, setStoreInfo] = useState<StoreEntireInfo>({
    uuid: '1210c3f2-4f68-4e85-94a7-81dc3d764393',
    name: '행보칸 카페',
    category: 0,
    description: '커피가 맛있는 감성있는 카페',
    location: '경인남길 134-1',
    coordinates: [37.566826, 126.9786567],
    representImage:
      'https://cdn.traveltimes.co.kr/news/photo/202109/113022_11185_1829.jpg',
    tags: ['맛집', '인스타감성', '야경'],
    startTime: '아침 9시',
    endTime: '저녁 10시',
    storeReviews: [
      {
        uuid: '321458b0-79ee-4fd0-b70d-2b3e71191bca',
        user: '1210c3f2-4f68-4e85-94a7-81dc3d764393',
        review: '정말 맛있어요',
      },
    ],
    reviewCount: 12,
    likeCount: 13,
    iLike: true,
  });
  const [isClickLike, setIsClickLike] = useState<boolean>(storeInfo.iLike);
  const [isCopyAddress, setIsCopyAddress] = useState<boolean>(false);
  const [reviews, setReviews] = useState<string[]>([]); // 리뷰 목록
  const [reviewText, setReviewText] = useState<string>('');

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const saveUserLike = async () => {
      try {
        if (userLike) {
          await axios.post(`/v1/stores/${storeUUID}/like`);
        } else {
          await axios.delete(`/v1/stores/${storeUUID}/like`);
        }
      } catch (e) {
        console.log(e);
      }
      setIsClickLike(false);
    };

    if (isClickLike) saveUserLike();
  }, [userLike]);

  const handleClickLike = async () => {
    setIsClickLike(true);
    setUserLike((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!markerInfo) {
    return null;
  }

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(markerInfo.location);
      setIsCopyAddress(true);
    } catch (e) {
      console.log(e);
    }
    setIsCopyAddress(false);
  };
  // 리뷰 작성 함수
  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post(
        `/v1/stores/${markerInfo?.uuid}/review`,
        {
          text: reviewText,
        },
      );
      const newReview = response.data; // 새로 작성된 리뷰 정보
      setReviews([...reviews, newReview]);
      setReviewText(''); // 입력 폼 초기화
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // 리뷰 삭제 함수
  const handleReviewDelete = async (reviewUUID: string) => {
    try {
      await axios.delete(
        `/v1/stores/${markerInfo?.uuid}/reviews/${reviewUUID}`,
      );
      setReviews(reviews.filter((review) => review.uuid !== reviewUUID));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-20">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-md max-w-[1000px] w-full h-[600px] grid grid-cols-5"
      >
        <div className="col-span-2 py-4 pr-4 border-r">
          <div className="flex items-center">
            <div className="text-xl font-semibold mr-4 mb-2">
              {markerInfo.name}
            </div>
            <span onClick={handleClickLike}>
              {userLike ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
            </span>
          </div>
          <div className="mb-2">주소: {markerInfo.location}</div>
          <BiCopy onClick={() => handleCopyAddress()} />
          <div className="mt-8 text-2xl font-semibold">추천코스</div>
          <ul className="mt-2 text-lg">
            {/* 추천코스 아이템들 */}
            <li className="flex items-center mt-2">
              <img
                src="경로/이미지1.jpg"
                alt="추천 코스 이미지"
                className="w-28 h-12 mr-2 rounded"
              />
              <div>
                <p className="text-lg font-semibold">코스 1</p>
                <p>샬라셜라</p>
                <p>2023.04.26 03:33</p>
              </div>
            </li>
            <li className="flex items-center mt-2">
              <img
                src="경로/이미지1.jpg"
                alt="추천 코스 이미지"
                className="w-28 h-12 mr-2 rounded"
              />
              <div>
                <p className="text-lg font-semibold">코스 2</p>
                <p>샬라셜라</p>
                <p>2023.04.26 03:33</p>
              </div>
            </li>
            <li className="flex items-center mt-2">
              <img
                src="경로/이미지1.jpg"
                alt="추천 코스 이미지"
                className="w-28 h-12 mr-2 rounded"
              />
              <div>
                <p className="text-lg font-semibold">코스 3</p>
                <p>샬라셜라</p>
                <p>2023.04.26 03:33</p>
              </div>
            </li>
            {/* 다른 코스 아이템들도 유사하게 추가 */}
          </ul>
        </div>
        <div className="col-span-3 p-4 mt-[150px]">
          <div className="flex justify-between mt-4">
            <img
              src="경로/사진1.jpg"
              alt="후기 사진"
              className="w-20 h-20 rounded"
            />
            <img
              src="경로/사진2.jpg"
              alt="후기 사진"
              className="w-20 h-20 rounded"
            />
            <img
              src="경로/사진3.jpg"
              alt="후기 사진"
              className="w-20 h-20 rounded"
            />
          </div>
          <div className="text-2xl font-semibold mb-4">리뷰⭐</div>
          <div className="text-sm mb-2">
            {/* 리뷰 목록 출력 */}
            {reviews.map((review) => (
              <div key={review.uuid}>
                {review.text}
                <button onClick={() => handleReviewDelete(review.uuid)}>
                  삭제
                </button>
              </div>
            ))}
          </div>
          {/* 리뷰 작성 폼 */}
          <div className="mt-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="리뷰를 작성하세요."
              className="w-[400px]"
            />
            <button onClick={handleReviewSubmit}>작성</button>
          </div>
          {/* 다른 후기들도 유사하게 추가 */}
        </div>
      </div>
    </div>
  );
};

export default MapModal;
