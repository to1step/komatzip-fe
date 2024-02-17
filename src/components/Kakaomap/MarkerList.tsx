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
    <div className="absolute bg-white top-[60%] top mx-auto right-0 left-0 p-0 w-96 shadow-md z-10 rounded-lg overflow-auto md:w-80 md:mr-8 md:top-2">
      <div className="text-lg text-center font-extrabold pt-2 text-blue-500">
        내 주변 가게
      </div>

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
      <div className="max-h-72 md:max-h-[750px]">
        {markers.map((marker) => (
          <div
            key={marker.uuid}
            className={`p-2 border-t border-blue-400 mt-2 ${
              marker.name === activeMarkerTitle ? 'bg-blue-100' : ''
            }`}
            onClick={() => onMarkerClick(marker)}
            onMouseOver={() => onMarkerMouseOver(marker)}
          >
            <p className="font-bold text-lg text-blue-400">{marker.name}</p>
            <p>{`주소: ${marker.location}`}</p>
            <p>{`태그: ${marker.tags}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarkerList;
