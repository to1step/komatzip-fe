import { useRef, useEffect } from 'react';
import { StoreEntireInfo } from '@to1step/propose-backend';
import LikeButton from '../MapModal/LikeButton';
import CopyAddressButton from '../MapModal/CopyAddressButton';
import ReviewList from '../MapModal/ReviewList';
import CourseList from '../MapModal/CourseList';

interface MapModalProps {
  markerInfo: StoreEntireInfo | null;
  onClose: () => void;
  recommendedCourses: StoreEntireInfo[];
}

const MapModal = ({
  markerInfo,
  onClose,
  recommendedCourses,
}: MapModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!markerInfo) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-20">
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg shadow-md max-w-[1100px] md:w-full w-[90%] h-[650px] grid grid-cols-1 md:grid-cols-5 overflow-auto"
      >
        <div className="md:col-span-2 md:py-4 md:pr-4 md:border-spacing-0 md:border-r">
          <div className="flex items-center mb-4">
            <div className="text-3xl font-bold text-blue-500 mr-4 mb-2">
              {markerInfo.name}
            </div>
            <LikeButton markerInfo={markerInfo} />
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-3 text-lg text-gray-500 font-bold">{`${markerInfo.location}`}</div>
            <CopyAddressButton location={markerInfo.location} />
          </div>
          <div className="mb-4 text-blue-600">{`#🔥 ${markerInfo.tags}`}</div>
          <div className="mt-6 text-2xl font-semibold">추천코스</div>
          <CourseList
            recommendedCourses={recommendedCourses}
            markerInfo={markerInfo}
          />
        </div>
        <div className="col-span-1 md:col-span-3 p-4 md:mt-[80px]">
          <div className="flex justify-between">
            <img
              src={markerInfo?.representImage || '기본 이미지 URL'}
              alt="후기 사진"
              className="w-[180px] h-30 rounded"
            />
          </div>
          <div className="text-2xl font-semibold mt-16">리뷰⭐</div>
          <ReviewList markerInfo={markerInfo} />
          {/* <MiniMap
            lat={markerInfo.coordinates[1]}
            lng={markerInfo.coordinates[0]}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MapModal;
