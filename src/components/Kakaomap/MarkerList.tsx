import { StoreEntireInfo } from '@to1step/propose-backend';

interface MarkerListProps {
  markers: StoreEntireInfo[];
  activeMarkerTitle: string | null;
  onMarkerClick: (markerInfo: StoreEntireInfo) => void;
  onMarkerMouseOver: (markerInfo: StoreEntireInfo) => void;
}

const MarkerList = ({
  markers,
  activeMarkerTitle,
  onMarkerClick,
  onMarkerMouseOver,
}: MarkerListProps) => {
  return (
    <div className="absolute top-2 right-[2vw] p-4 bg-white w-[350px] shadow-md z-10 rounded-lg overflow-auto">
      <style>
        {`
          ::-webkit-scrollbar {
            width: 0.8em;
          }

          ::-webkit-scrollbar-thumb {
            background-color: transparent;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }

          ::-webkit-scrollbar-track {
            background-color: transparent;
          }
        `}
      </style>
      <div className="max-h-[750px]">
        {markers.map((marker) => (
          <div
            key={marker.uuid} // 고유 키로 uuid 사용
            className={`p-2 border-t border-blue-400 mt-2 ${
              marker.name === activeMarkerTitle ? 'bg-blue-100' : ''
            }`}
            onClick={() => onMarkerClick(marker)}
            onMouseOver={() => onMarkerMouseOver(marker)}
          >
            <p className="font-bold text-lg text-blue-500">{marker.name}</p>
            <p>{`주소: ${marker.location}`}</p>
            <p>{`태그: ${marker.tags}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkerList;
