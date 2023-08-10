import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rank } from '../../type';
import Tags from '../Post/Tags';
import Description from '../Post/Description';
import Location from '../Post/Location';
import Name from '../Post/Name';
import Image from '../Post/Image';
import Category from '../Post/Category';
// import { Link } from 'react-router-dom';
// import StoreInfo from '../modal/StoreInfo';

const Topstore = () => {
  const [address, setAddress] = useState<string | null>(null); // 주소 타입 변경
  const [data, setData] = useState<Rank[]>([]); // Rank 타입 배열로 바꿈

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
            const { data } = await axios.get<Rank[]>(
              `https://api.to1step.shop/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
            );

            setAddress(
              addressData.region_1depth_name +
                ' ' +
                addressData.region_2depth_name +
                ' ' +
                addressData.region_3depth_name,
            );
            setData(data);
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
      {data.map((item, index) => (
        <div key={index}>
          <Image imageUrl={item.image} />
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
