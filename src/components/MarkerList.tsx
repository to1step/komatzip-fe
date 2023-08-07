import React from 'react';

interface MarkerInfo {
  title: string;
  lat: number;
  lng: number;
}

interface MarkerListProps {
  markers: MarkerInfo[];
  activeMarkerTitle: string | null;
}

const MarkerList: React.FC<MarkerListProps> = ({
  markers,
  activeMarkerTitle,
}) => {
  return (
    <div className="absolute top-2 right-0 p-4 bg-white w-[230px] shadow-md z-10 rounded-lg">
      {markers.map((marker) => (
        <div
          key={marker.title}
          className={`p-2 border-t border-gray-300 mt-2 ${
            marker.title === activeMarkerTitle ? 'bg-gray-200' : ''
          }`}
        >
          <p className="font-semibold">{`가게이름: ${marker.title}`}</p>
          <p>{`주소: 예시 주소`}</p>
        </div>
      ))}
    </div>
  );
};

export default MarkerList;
