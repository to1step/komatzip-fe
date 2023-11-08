import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreEntireInfo, StoreReview, Store } from '@to1step/propose-backend';

interface ReviewListProps {
  markerInfo: StoreEntireInfo | Store | null;
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
          const storeInfo = response.data.data;
          console.log('서버 응답:', response);
          const storeReviews = storeInfo.storeReviews || [];
          setReviews(storeReviews);
        } catch (error) {
          console.error('Error fetching store info:', error);
        }
      };

      setPrevMarkerInfo(markerInfo as StoreEntireInfo | null);
      fetchStoreInfo();
    }
  }, [markerInfo, prevMarkerInfo]);

  const handleReviewSubmit = async () => {
    const newReview = {
      uuid: Math.random().toString(),
      review: reviewText,
      user: '현재 사용자 ID',
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setReviewText('');

    try {
      if (markerInfo) {
        // markerInfo가 null이 아닐 때만 요청을 보냄
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
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.uuid !== newReview.uuid),
      );
    }
  };

  const handleReviewDelete = async (reviewUUID: string) => {
    try {
      if (markerInfo) {
        // markerInfo가 null이 아닐 때만 요청을 보냄
        await axios.delete(
          `/v1/stores/${markerInfo.uuid}/reviews/${reviewUUID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setReviews(reviews.filter((review) => review.uuid !== reviewUUID));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex w-full">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="후기를 작성해 주세요."
          className="w-10/12 h-[60px] p-2 border rounded"
        />
        <button
          onClick={handleReviewSubmit}
          className="px-4 mt-1 ml-3 h-[45px] bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          작성
        </button>
      </div>

      <div className="mt-4 w-full overflow-auto h-[198px] border-2  border-blue-200 rounded-lg p-0">
        {reviews.map((review) => (
          <div
            key={review.uuid}
            className="border mt-1 ml-1 p-4 mb-2 rounded flex justify-between items-center"
          >
            <p className="w-[400px]">{review.review}</p>
            <button
              onClick={() => handleReviewDelete(review.uuid)}
              className="w-[55px] px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
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
