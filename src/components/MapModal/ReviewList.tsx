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
  const [reviewText, setReviewText] = useState<string>('');

  useEffect(() => {
    if (markerInfo && prevMarkerInfo !== markerInfo) {
      console.log('markerInfo 데이터:', markerInfo);
      const fetchStoreInfo = async () => {
        try {
          const response = await axios.get(`/v1/stores/${markerInfo.uuid}`);
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
    try {
      const response = await axios.post(
        `/v1/stores/${markerInfo.uuid}/review`,
        {
          review: reviewText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('서버 응답:', response.data);
      // const newReview = response.data as StoreReview;
      const newReview = {
        uuid: 'temporary-uuid',
        user: 'user-id',
        review: reviewText,
      };
      setReviews([...reviews, newReview]);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewDelete = async (reviewUUID: string) => {
    try {
      await axios.delete(
        `/v1/stores/${markerInfo?.uuid}/reviews/${reviewUUID}`,
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
    <div className="mt-4">
      <div className="flex">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="리뷰를 작성하세요."
          className="w-[500px] p-2 border rounded"
        />
        <button
          onClick={handleReviewSubmit}
          className="px-4 mt-1 h-[5vw] bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
        >
          작성
        </button>
      </div>

      <div className="mt-4">
        {reviews.map((review) => (
          <div key={review.uuid} className="border p-4 mb-2 rounded">
            <p>{review.review}</p>
            <button
              onClick={() => handleReviewDelete(review.uuid)}
              className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
