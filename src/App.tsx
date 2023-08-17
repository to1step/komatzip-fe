import './App.css';
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
                  Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
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
    <div className="container mx-auto p-4 py-4 px-10 ">
      <header className="w-screen flex justify-between items-center">
        <Link
          to="/"
          className="h-[70px] text-[50px] font-custom text-black hover:text-black "
        >
          코맛집
        </Link>
        <Link
          to="/login"
          className="mr-[100px] text-sl font-semibold hover:text-gray-500"
        >
          로그인
        </Link>
      </header>
      <main>
        <Search />
        <Routes>
          <Route path="/" element={<Topstore data />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
