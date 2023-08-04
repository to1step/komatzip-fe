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

        // 카카오맵 생성
        const map = new window.kakao.maps.Map(container, options);

        // 여러 개의 마커 정보를 배열로 준비
        const markersData = [
          {
            title: '마커1',
            latlng: new window.kakao.maps.LatLng(37.5665, 126.978),
          },
          {
            title: '마커2',
            latlng: new window.kakao.maps.LatLng(37.5642, 126.9751),
          },
          // 여러 개의 마커 정보를 추가할 수 있음
        ];

        // 각 마커 정보를 이용하여 마커 생성 및 이벤트 등록
        markersData.forEach((markerInfo) => {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: markerInfo.latlng,
          });

          // 마커 클릭 이벤트 등록
          window.kakao.maps.event.addListener(marker, 'click', function () {
            alert(markerInfo.title + ' 마커를 클릭했습니다.');
          });
        });
      });
    };
  }, []);

  return <div id="kakao-map" style={{ width: '100%', height: '400px' }}></div>;
};

export default KakaoMap;
