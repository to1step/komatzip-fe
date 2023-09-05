import React, { useRef, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiCopy } from 'react-icons/bi';
import axios from 'axios';
import { StoreEntireInfo, StoreReview } from '@to1step/propose-backend';

interface MapModalProps {
  markerInfo: StoreEntireInfo;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ markerInfo, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [prevMarkerInfo, setPrevMarkerInfo] = useState<StoreEntireInfo | null>(
    null,
  );
  const [isClickLike, setIsClickLike] = useState<boolean>(false);
  const [isCopyAddress, setIsCopyAddress] = useState<boolean>(false);
  const [reviews, setReviews] = useState<StoreReview[]>([]); // 리뷰 목록
  const [reviewText, setReviewText] = useState<string>(''); // 리뷰 텍스트 입력 상태 변수
  const [markerLike, setMarkerLike] = useState<boolean>(
    (markerInfo && markerInfo.iLike) || false,
  );

  const token = localStorage.getItem('JWtTokken');

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

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

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    // markerInfo가 변경된 경우에만 요청을 실행
    if (markerInfo && prevMarkerInfo !== markerInfo) {
      console.log('markerInfo 데이터:', markerInfo);
      const fetchStoreInfo = async () => {
        try {
          const response = await axios.get(
            `https://api.to1step.shop/v1/stores/${markerInfo.uuid}`,
          );
          const storeInfo = response.data;
          // 가게 정보에서 리뷰 데이터 추출
          console.log('서버 응답:', response);
          const storeReviews = storeInfo.storeReviews || [];
          // 리뷰 목록을 상태 변수에 설정
          setReviews(storeReviews);
        } catch (error) {
          console.error('Error fetching store info:', error);
        }
      };

      // markerInfo가 변경된 경우, 이전 markerInfo 값을 업데이트하고 요청 실행
      setPrevMarkerInfo(markerInfo);
      fetchStoreInfo();
    }
  }, [markerInfo, prevMarkerInfo]);

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
    console.log('리뷰 작성 버튼 클릭됨');
    try {
      const response = await axios.post(
        `https://api.to1step.shop/v1/stores/${markerInfo.uuid}/review`,
        {
          text: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('서버 응답:', response);
      const newReview = response.data as StoreReview; // 새로 작성된 리뷰 정보
      setReviews([...reviews, newReview]);
      setReviewText(''); // 입력 폼 초기화
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
    }
  };

  // 리뷰 삭제 함수
  const handleReviewDelete = async (reviewUUID: string) => {
    try {
      await axios.delete(
        `https://api.to1step.shop/v1/stores/${markerInfo?.uuid}/reviews/${reviewUUID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setReviews(reviews.filter((review) => review.uuid !== reviewUUID));
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  if (!markerInfo) {
    return null;
  }

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
              {markerLike ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
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
                {review.review} {/* "review" 속성을 가져와 표시 */}
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
