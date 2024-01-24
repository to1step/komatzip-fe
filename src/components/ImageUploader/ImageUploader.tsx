import axiosInstance from '../../api/apiInstance';
import { useState, useEffect } from 'react';
import ZoomImage from './ZoomImage';
import { Store, StoreEntireInfo, StoreImage } from '@to1step/propose-backend';

interface ImageUploadProps {
  markerInfo: StoreEntireInfo | Store;
  onImageChange: () => void;
}

const ImageUploader = ({ markerInfo, onImageChange }: ImageUploadProps) => {
  const [images, setImages] = useState<StoreImage[]>([]);

  useEffect(() => {
    if (markerInfo && (markerInfo as StoreEntireInfo).storeReviewImages) {
      setImages((markerInfo as StoreEntireInfo).storeReviewImages);
    } else {
      setImages([]);
    }
  }, [markerInfo]);

  const fetchStoreImages = async () => {
    try {
      if (markerInfo) {
        const response = await axiosInstance.get<StoreEntireInfo>(
          `/v1/stores/${markerInfo.uuid}`,
        );
        const storeInfo = response.data;
        const storeImages = storeInfo.storeReviewImages || [];
        setImages(storeImages);
      }
    } catch (error) {
      console.error('Error fetching store images:', error);
    }
  };

  useEffect(() => {
    fetchStoreImages();
  }, [markerInfo]);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('images', imageFile);

    try {
      const response = await axiosInstance.post('/v1/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response?.data?.imageLocationList) {
        const imageSrc = response.data.imageLocationList[0] as string;
        const storeUUID = markerInfo.uuid;

        if (storeUUID) {
          const imageResponse = await axiosInstance.post(
            `/v1/stores/${storeUUID}/image`,
            {
              src: imageSrc,
            },
          );

          console.log('서버 응답:', imageResponse.data);

          if (imageResponse?.data?.image) {
            const newImage: StoreImage = {
              uuid: imageResponse.data.image.uuid,
              user: '',
              store: markerInfo.uuid,
              imageSrc: imageResponse.data.image as string,
            };

            setImages((prevImages) => [...prevImages, newImage]);
            onImageChange();
            fetchStoreImages();
          }
        }
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류가 발생했습니다:', error);
    }
  };

  const handleImageDelete = async (imageUUID: string) => {
    try {
      const storeUUID = markerInfo.uuid;
      const response = await axiosInstance.delete(
        `/v1/stores/${storeUUID}/image/${imageUUID}`,
      );

      if (response?.data?.data) {
        // 서버에서 삭제 성공한 경우에만 상태 갱신
        setImages((prevImages) =>
          prevImages.filter((img) => img.uuid !== imageUUID),
        );
        onImageChange(); // 이미지 변경 알림
      }
    } catch (error) {
      console.error('이미지 삭제 중 오류가 발생했습니다:', error);
    }
    fetchStoreImages();
  };

  return (
    <section>
      <div className="my-2 flex flex-row items-center">
        <label
          htmlFor="imageUploadInput"
          className="w-32 h-32 border-dashed border-2 bg-gray-100 border-gray-300 flex justify-center items-center cursor-pointer rounded-2xl transition duration-300 hover:bg-gray-200"
        >
          +
          <span role="img" aria-label="camera">
            📷
          </span>{' '}
          Upload
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            id="imageUploadInput"
          />
        </label>

        {images.map((image, i) => (
          <div
            key={i}
            className="w-44 h-32 ml-2 border border-gray-300 flex justify-center items-center rounded-2xl"
          >
            <ZoomImage
              key={image.imageSrc}
              src={image.imageSrc}
              alt={`Uploaded ${i}`}
              onDelete={() => handleImageDelete(image.uuid)}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageUploader;
