import { User } from '@to1step/propose-backend';
import React, { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from './redux/locationActions';
import { RootState } from './redux/store';
import axios from 'axios';
import Post from './pages/post/Post';
import Search from './components/Search/Search';
import Topstore from './components/rank/Topstore';
import axiosInstance from './api/apiInstance';

import Search from './components/Search/Search';
import MapPage from './pages/MapPage';
function App() {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.location);
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
                  Authorization: `KakaoAK ${
                    import.meta.env.REACT_APP_KAKAO_REST_API_KEY
                  }`,
                },
              },
            );
            const addressData = response.data.documents[0];
            if (addressData.region_1depth_name === '서울특별시') {
              addressData.region_1depth_name = '서울시';
            }

            const { data } = await axiosInstance.get(
              `https://api.to1step.shop/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
            );

            dispatch(
              updateLocation(
                addressData.region_1depth_name +
                  ' ' +
                  addressData.region_2depth_name +
                  ' ' +
                  addressData.region_3depth_name,
              ),
            );
            setData(data);
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => console.error('Error getting location:', error),
      );
    }
  }, [dispatch, address]);

  return (
    <>
      <Link to="/" className="text-3xl font-bold">
        진짜 한국
      </Link>
      <Search />
      <Routes>
        <Route path="/" element={<Topstore data />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mappage" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;
