// import { User } from '@to1step/propose-backend';
import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from './redux/module/locationSlice';
import { RootState } from './redux/module';
import axios from 'axios';
import Search from './components/Search/Search';
import Topstore from './components/Rank/Topstore';
import axiosInstance from './api/apiInstance';
import SearchPage from './pages/search/SearchPage';
import Topcourse from './components/rank/Topcourse';

import MapPage from './pages/MapPage';
function App() {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.location);
  const [data, setData] = useState<User[]>([]);

  console.log(data);

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
                  Authorization: `KakaoAK 53e5de546fe738bcca1d3a3b53c993bd`,
                },
              },
            );
            const addressData = response.data.documents[0];
            if (addressData.region_1depth_name === '서울특별시') {
              addressData.region_1depth_name = '서울시';
            }

            const { data: locationResponseData } = await axiosInstance.get(
              // `/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
              `/v1/rank?type=store&region=서울시 강남구`,
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
            setData(locationResponseData);
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
      <Link
        to="/"
        className="h-[70px] p-[5px] text-[50px] font-custom text-black hover:text-black "
      >
        코맛집
      </Link>
      <Search />
      <Routes>
        <Route path="/" element={<Topstore />} />
        <Route path="/post" element={<Post />} />
        <Route path="/mappage" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;
