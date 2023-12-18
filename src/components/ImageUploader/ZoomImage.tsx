import { useState } from 'react';

interface ZoomImageProps {
  src: string;
  alt: string;
}

const ZoomImage = ({ src, alt }: ZoomImageProps) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-2xl cursor-pointer"
        onClick={handleClick}
      />
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
          onClick={handleClick}
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
