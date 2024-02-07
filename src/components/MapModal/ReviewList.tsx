import { useEffect, useState } from 'react';
import axiosInstance from '../../api/apiInstance';
import {
  StoreEntireInfo,
  Store,
  StoreReviewWithUser,
} from '@to1step/propose-backend';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/module';
import { success, errors } from '../../util/toastify';

interface ReviewListProps {
  markerInfo: StoreEntireInfo | Store | null;
}

const ReviewList = ({ markerInfo }: ReviewListProps) => {
  const [prevMarkerInfo, setPrevMarkerInfo] = useState<StoreEntireInfo | null>(
    null,
  );
  const [reviews, setReviews] = useState<StoreReviewWithUser[]>([]);
  const [reviewText, setReviewText] = useState<string>('');

  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    if (markerInfo && prevMarkerInfo !== markerInfo) {
      const fetchStoreInfo = async () => {
        try {
          const response = await axiosInstance.get<StoreEntireInfo>(
            `/v1/stores/${markerInfo.uuid}`,
          );
          const storeInfo = response.data;
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
    try {
      if (markerInfo && userData) {
        const newReview: StoreReviewWithUser = {
          uuid: Math.random().toString(),
          review: reviewText,
          user: userData.email,
          nickname: userData.nickname,
          myReview: false,
        };

        await axiosInstance.post(`/v1/stores/${markerInfo.uuid}/review`, {
          review: reviewText,
        });
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setReviewText('');
        success('리뷰가 작성되었습니다.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewDelete = async (reviewUUID: string) => {
    try {
      if (markerInfo && userData) {
        const reviewToDelete = reviews.find(
          (review) => review.uuid === reviewUUID,
        );
        if (reviewToDelete) {
          if (reviewToDelete.nickname === userData.nickname) {
            await axiosInstance.delete(
              `/v1/stores/${markerInfo.uuid}/reviews/${reviewUUID}`,
            );
            setReviews((prevReviews) =>
              prevReviews.filter((review) => review.uuid !== reviewUUID),
            );
            errors('리뷰가 삭제되었습니다.');
          }
        }
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
            {userData?.nickname === review.nickname && (
              <button
                onClick={() => handleReviewDelete(review.uuid)}
                className="w-[55px] px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                삭제
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
