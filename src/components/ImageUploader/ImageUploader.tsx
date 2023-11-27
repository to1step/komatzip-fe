import axiosInstance from '../../api/apiInstance';
import { useState } from 'react';
import ModalImage from './ZoomImage';

const ImageUploader = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('images', imageFile);

    const response = await axiosInstance
      .post('/v1/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .catch(() => null);

    if (response?.data?.imageLocationList?.[0]) {
      setImages((prevImages) => [
        ...prevImages,
        response.data.imageLocationList[0],
      ]);
    }
  };

  return (
    <section>
      <div className="my-2 flex flex-row items-center">
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
          id="imageUploadInput"
        />
        <label
          htmlFor="imageUploadInput"
          className="w-32 h-32 border-dashed border-2 bg-gray-100 border-gray-300 flex justify-center items-center cursor-pointer rounded-2xl transition duration-300 hover:bg-gray-200"
        >
          +
          <span role="img" aria-label="camera">
            📷
          </span>{' '}
          Upload
        </label>
        {images.map((image, i) => (
          <div
            key={i}
            className="w-44 h-32 ml-2 border border-gray-300 flex justify-center items-center rounded-2xl"
          >
            <ModalImage src={image} alt={`Uploaded ${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageUploader;
