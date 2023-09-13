import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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
                  Authorization: `KakaoAK a055e717c1cb42e8ee196835ba48dfcf`,
                },
              },
            );
            const addressData = response.data.documents[0];

            const { data: locationResponseData } = await axiosInstance.get(
              `/v1/rank?type=store&region=${addressData.region_1depth_name} ${addressData.region_2depth_name}`,
              // `/v1/rank?type=store&region=서울특별시 강남구`,
            );

            dispatch(
              updateLocation(
                addressData.region_1depth_name +
                  ' ' +
                  addressData.region_2depth_name,
                // +
                // ' ' +
                // addressData.region_3depth_name,
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
      <main>
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
