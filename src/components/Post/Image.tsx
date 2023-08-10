import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rank } from '../../type';

interface ImageProps {
  representImage: string;
  addressData: {
    region_1depth_name: string;
    region_2depth_name: string;
  } | null;
}

const Image = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [addressData, setAddressData] = useState<ImageProps[]>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (addressData) {
        const response = await axios.get<Rank[]>(
          `https://api.to1step.shop/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
        );
        const responseData = response.data;

        if (Array.isArray(responseData.data)) {
          const processData: ImageProps[] = responseData.data.map(
            (rank: Rank) => ({
              representImage: rank.representImage,
            }),
          );
          setImages((prevImage) => [...prevImage, ...processData]);
        } else {
          console.error(
            '데이터를 가져오는 중에 에러가 발생했다! 그 이유는',
            responseData.data,
          );
        }
      }
    } catch (error) {
      console.log('에러:', error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-shrink-0 text-gray-700 text-base font-normal w-308">
      {images.map((imagesList, listIndex) => (
        <article key={listIndex}>
          <img src={imagesList.representImage} alt={`Image ${listIndex}`} />
        </article>
      ))}
    </div>
  );
};

export default Image;
