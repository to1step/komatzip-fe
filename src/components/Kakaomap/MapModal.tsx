import React from 'react';

interface ModalProps {
  markerInfo: {
    title: string;
    address: string;
  } | null;
  onClose: () => void;
}

const MapModal: React.FC<ModalProps> = ({ markerInfo, onClose }) => {
  if (!markerInfo) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">{markerInfo.title}</h2>
        <p className="mb-4">{`주소: ${markerInfo.address}`}</p>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default MapModal;
