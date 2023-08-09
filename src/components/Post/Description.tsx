import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Komatzip } from '../../type';

interface DescriptionProps {
  description: string;
}

const Description = () => {
  const [descriptions, setDescriptions] = useState<DescriptionProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Komatzip[]>(
        `https://api.to1step.shop/v1/rank?type=store&region=서울시%20송파구`,
      );
      const responseData = response.data;

      if (Array.isArray(responseData.data)) {
        const processData: DescriptionProps[] = responseData.data.map(
          (komatzip: Komatzip) => ({
            description: komatzip.description,
          }),
        );
        setDescriptions((prevDescription) => [
          ...prevDescription,
          ...processData,
        ]);
      } else {
        console.error(
          '데이터를 가져오는 중에 에러가 발생했다! 그 이유는',
          responseData.data,
        );
      }
    } catch (error) {
      console.log('에러:', error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-shrink-0 text-gray-700 text-base ">
      {descriptions.map((descriptionList, listIndex) => (
        <article key={listIndex}>
          <p className="text-xs border-black w-308">
            {descriptionList.description}
          </p>
        </article>
      ))}
    </div>
  );
};

export default Description;
