import React, { useState, useEffect, createContext, useContext } from 'react';
import axiosInstance from '../../api/apiInstance';
import { Rank } from '../../type';
import Tags from '../Post/Tags';
import Description from '../Post/Description';
import Location from '../Post/Location';
import Name from '../Post/Name';
import Image from '../Post/Image';
import Category from '../Post/Category';


interface TopStoreProps {
  uuid: string;
  name: string;
  category: number;
  description: string;
  location: string;
  coordinates: number[];
  representImage: string;
  tags: string[];
  startTime: string;
  endTime: string;
}

const TopStoreContext = createContext();

const useTopStoreContext = () => {
  return useContext(TopStoreContext);
}


const Topstore = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [data, setData] = useState<TopStoreProps[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          try {
            const response = await axios.get(
              `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`,
              {
                headers: {
                  Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
                },
              },
            );
            const addressData = response.data.documents[0];
            if (addressData.region_1depth_name === '서울특별시') {
              addressData.region_1depth_name = '서울시';
            }
            const { data } = await axiosInstance.get<TopStoreProps[]>(
              `https://api.to1step.shop/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
            );

            setAddress(
              addressData.region_1depth_name +
                ' ' +
                addressData.region_2depth_name +
                ' ' +
                addressData.region_3depth_name,
            );

            if (Array.isArray(data)) {
              const processData: TopStoreProps[] = data.map((rank: Rank) => ({
                uuid: rank.uuid,
                name: rank.name,
                category: rank.category,
                description: rank.description,
                location: rank.location,
                coordinates: rank.coordinates,
                representImage: rank.representImage,
                tags: rank.tags,
                startTime: rank.startTime,
                endTime: rank.endTime,
              }));
              setData(processData);
            } else {
              console.error(
                '데이터를 가져오는 중에 에러가 발생했다! 그 이유는',
                data,
              );
            }
          } catch (error) {
            console.log('Error fetching address', error);
          }
        },
        (error) => console.log('Error getting location:', error),
      );
    }
  }, []);

  return (
    <div className="flex justify-center items-center w-320 h-394">
      {address ? <p>{address}</p> : <p>Loading...</p>}
      {data.map((item) => (
        <div key={item.uuid}>
          <Image representImage={representImage} />
          <Name name={item.name} />
          <Location location={item.location} />
          <Description description={item.description} />
          <Category category={item.category} />
          <Tags tags={item.tags} />
        </div>
      ))}
    </div>
  );
};

export default Topstore;
