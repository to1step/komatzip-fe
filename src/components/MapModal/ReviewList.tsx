import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreEntireInfo, StoreReview } from '@to1step/propose-backend';

interface ReviewListProps {
  markerInfo: StoreEntireInfo;
  token: string | null;
}

const ReviewList = ({ markerInfo, token }: ReviewListProps) => {
  const [prevMarkerInfo, setPrevMarkerInfo] = useState<StoreEntireInfo | null>(
    null,
  );
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [reviewText, setReviewText] = useState<string>(''); // 리뷰 텍스트 입력 상태 변수

  useEffect(() => {
    if (markerInfo && prevMarkerInfo !== markerInfo) {
      console.log('markerInfo 데이터:', markerInfo);
      const fetchStoreInfo = async () => {
        try {
          const response = await axios.get(
            `https://api.to1step.shop/v1/stores/${markerInfo.uuid}`,
          );
          const storeInfo = response.data;
          console.log('서버 응답:', response);
          const storeReviews = storeInfo.storeReviews || [];
          setReviews(storeReviews);
        } catch (error) {
          console.error('Error fetching store info:', error);
        }
      };

      setPrevMarkerInfo(markerInfo);
      fetchStoreInfo();
    }
  }, [markerInfo, prevMarkerInfo]);

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

  return (
    <div>
      {/* 리뷰 목록 출력 */}
      {reviews.map((review) => (
        <div key={review.uuid}>
          {review.review}
          <button onClick={() => handleReviewDelete(review.uuid)}>삭제</button>
        </div>
      ))}

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
    </div>
  );
};

export default ReviewList;
