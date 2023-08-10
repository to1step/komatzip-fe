import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tags from '../Post/Tags';
import Description from '../Post/Description';
import Location from '../Post/Location';
import Name from '../Post/Name';
import Image from '../Post/Image';
import Category from '../Post/Category';
// import { Link } from 'react-router-dom';
// import StoreInfo from '../modal/StoreInfo';

const Topstore = () => {
  const [address, setAddress] = useState(null);
  const [data, setData] = useState([]);

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
            let addressData = response.data.documents[0];
            if (addressData.region_1depth_name === '서울특별시') {
              addressData.region_1depth_name = '서울시';
            }
            const { data } = await axios.get(
              `https://api.to1step.shop/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
            );

            setAddress(
              address.Data.region_1depth_name +
                ' ' +
                addressData.region_2depth_name +
                ' ' +
                addressData.region_3depth_name,
            );
            setData(data.data);
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
