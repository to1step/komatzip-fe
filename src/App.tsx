import { useEffect, useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from './redux/module/locationSlice';
import { RootState } from './redux/module';
import axios from 'axios';
import axiosInstance from './api/apiInstance';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/search/SearchPage';
import MapPage from './pages/MapPage';
import { User } from '@to1step/propose-backend';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';

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
              `/v1/rank?type=store&region=서울특별시 강남구`,
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
    <div>
      {/* TODO: 해당 부분 사용하는 컴포넌트 페이지에 넣기 */}
      {/* <header className="w-full flex justify-between items-center">
        <Link
          to="/"
          className="h-[70px] text-[50px] font-custom text-black hover:text-black "
        >
          코맛집
        </Link>
        <Link to="/login" className="text-sl font-semibold hover:text-gray-500">
          로그인
        </Link>
      </header> */}
      <main>
        {/* <Search /> */}
        <Routes>
          {/* IF 문임  */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
