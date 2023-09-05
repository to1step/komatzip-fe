import React, { useRef, useEffect } from 'react';
import { StoreEntireInfo } from '@to1step/propose-backend';
import LikeButton from '../MapModal/LikeButton';
import CopyAddressButton from '../MapModal/CopyAddressButton';
import ReviewList from '../MapModal/ReviewList';

interface MapModalProps {
  markerInfo: StoreEntireInfo;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ markerInfo, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const token = localStorage.getItem('JWtTokken');

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
        className="bg-white p-4 rounded-lg shadow-md max-w-[1000px] w-full h-[600px] grid grid-cols-5"
      >
        <div className="col-span-2 py-4 pr-4 border-r">
          <div className="flex items-center">
            <div className="text-xl font-semibold mr-4 mb-2">
              {markerInfo.name}
            </div>
            <LikeButton markerInfo={markerInfo} token={token} />
          </div>
          <div className="mb-2">주소: {markerInfo.location}</div>
          <CopyAddressButton address={markerInfo.location} />
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
          <ReviewList markerInfo={markerInfo} token={token} />
        </div>
      </div>
    </div>
  );
};

export default MapModal;
