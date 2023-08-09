import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Rank } from '../../type';

interface LocationProps {
  location: string;
}

const Location = () => {
  const [locations, setLocations] = useState<LocationProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<Rank[]>(
        `https://api.to1step.shop/v1/rank?type=store&region=서울시%20송파구`,
      );
      const responseData = response.data;

      if (Array.isArray(responseData.data)) {
        const processData: LocationProps[] = responseData.data.map(
          (komatzip: Komatzip) => ({
            location: komatzip.location,
          }),
        );
        setLocations((prevLocation) => [...prevLocation, ...processData]);
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
    <div className="flex justify-center items-center flex-shrink-0 text-gray-700 text-base font-normal w-308">
      {locations.map((locationList, listIndex) => (
        <article key={listIndex}>
          <p>{locationList.location}</p>
        </article>
      ))}
    </div>
  );
};

export default Location;
