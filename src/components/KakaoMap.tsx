import React, { useEffect } from 'react';

const KakaoMap: React.FC = () => {
  useEffect(() => {
    // 카카오맵 API 스크립트 불러오기
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8494ed9ba10ea55ff5cf793934c04231&autoload=false`;
    document.head.appendChild(script);

    // 스크립트 로딩이 완료되면 카카오맵 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울시청 좌표
          level: 4,
        };
        new window.kakao.maps.Map(container, options);
      });
    };
  }, []);

  return <div id="kakao-map" style={{ width: '100%', height: '400px' }}></div>;
};

export default KakaoMap;
