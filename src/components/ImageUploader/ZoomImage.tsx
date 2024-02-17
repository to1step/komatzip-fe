import { useState } from 'react';
import { PiMagnifyingGlassPlusBold } from 'react-icons/pi';
import { MdDeleteOutline } from 'react-icons/md';

interface ZoomImageProps {
  src: string;
  alt: string;
  onDelete: () => void;
}

const ZoomImage = ({ src, alt, onDelete }: ZoomImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleHover = (hoverState: boolean) => {
    setIsHovered(hoverState);
  };

  const handleImageDelete = async () => {
    onDelete();
  };

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <img
          src={src}
          alt={alt}
          className="w-44 h-32 object-cover rounded-2xl cursor-pointer"
          onClick={() => setModalOpen(!isModalOpen)}
        />
        {isHovered && (
          <div className="absolute rounded-2xl top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="flex items-center">
              <div
                className="text-white mr-2 cursor-pointer"
                onClick={() => setModalOpen(!isModalOpen)}
              >
                <PiMagnifyingGlassPlusBold size={24} />
              </div>
              <div
                className="text-white cursor-pointer"
                onClick={handleImageDelete}
              >
                <MdDeleteOutline size={24} />
              </div>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={() => setModalOpen(!isModalOpen)}
        >
          <img
            src={src}
            alt={alt}
            style={{ width: '672px', height: '448px' }}
            className="rounded-2xl"
          />
        </div>
      )}
    </>
  );
};

export default ZoomImage;
