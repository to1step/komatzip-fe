import React from 'react';

interface MarkerInfo {
  title: string;
  lat: number;
  lng: number;
  address: string; // 주소 속성 추가
}

interface MarkerListProps {
  markers: MarkerInfo[];
  activeMarkerTitle: string | null;
  onMarkerClick: (markerInfo: MarkerInfo) => void;
}

const MarkerList: React.FC<MarkerListProps> = ({
  markers,
  activeMarkerTitle,
  onMarkerClick,
}) => {
  return (
    <div className="absolute top-2 right-[300px] p-4 bg-white w-[350px] shadow-md z-10 rounded-lg overflow-auto">
      <style>
        {`
          ::-webkit-scrollbar {
            width: 0.8em; /* 스크롤바의 너비 조정 */
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent; /* 스크롤바 thumb의 배경 색상을 투명으로 설정 */
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.2); /* 마우스 오버했을 때 배경 색상 변경 */
          }

          ::-webkit-scrollbar-track {
            background-color: transparent; /* 스크롤바 트랙의 배경 색상을 투명으로 설정 */
          }
        `}
      </style>
      <div className="max-h-[750px]">
        {markers.map((marker) => (
          <div
            key={marker.title}
            className={`p-2 border-t border-gray-300 mt-2 ${
              marker.title === activeMarkerTitle ? 'bg-gray-200' : ''
            }`}
            onClick={() => onMarkerClick(marker)}
          >
            <p className="font-semibold">{`${marker.title}`}</p>
            <p>{`주소: ${marker.address}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkerList;
