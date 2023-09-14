import React, { useEffect, useRef } from 'react';
import { StoreEntireInfo } from '@to1step/propose-backend';

interface MapDisplayProps {
  map: window.kakao.maps.Map | null;
  markersData: StoreEntireInfo[];
  myPosition: { lat: number; lng: number } | null; // 내 위치 정보 추가
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  map,
  markersData,
  myPosition,
}) => {
  const infowindowRef = useRef<window.kakao.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (map) {
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // 인포윈도우 생성
      infowindowRef.current = infowindow;

      // 마커를 생성하고 이벤트 리스너 추가
      markersData.forEach((markerInfo) => {
        const markerPosition = new window.kakao.maps.LatLng(
          markerInfo.coordinates[1],
          markerInfo.coordinates[0],
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          displayInfoWindow(
            marker,
            markerInfo.name,
            map,
            markerInfo.coordinates[1],
            markerInfo.coordinates[0],
          );
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          closeInfoWindow();
        });

        marker.setMap(map);
      });

      // 내 위치 마커 추가
      if (myPosition) {
        const myPositionMarker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            myPosition.lat,
            myPosition.lng,
          ),
          image: new window.kakao.maps.MarkerImage(
            'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            new window.kakao.maps.Size(24, 35),
          ),
        });

        // 마커 이벤트 리스너 추가 (마우스 오버 시 인포윈도우 표시)
        window.kakao.maps.event.addListener(
          myPositionMarker,
          'mouseover',
          () => {
            displayInfoWindow(
              myPositionMarker,
              '내 위치',
              map,
              myPosition.lat,
              myPosition.lng,
            );
          },
        );

        window.kakao.maps.event.addListener(
          myPositionMarker,
          'mouseout',
          () => {
            closeInfoWindow();
          },
        );

        myPositionMarker.setMap(map);
      }
    }
  }, [map, markersData, myPosition]);

  const displayInfoWindow = (
    marker: window.kakao.maps.Marker,
    title: string,
    map: window.kakao.maps.Map | null,
    lat: number,
    lng: number,
  ) => {
    const infowindow = infowindowRef.current;
    if (infowindow && map) {
      infowindow.setContent(
        `<div class="p-2 ml-8 text-blue-500 text-lg">${title}</div>`,
      );
      infowindow.open(map, marker);
    }
  };

  const closeInfoWindow = () => {
    const infowindow = infowindowRef.current;
    if (infowindow !== null) {
      infowindow.close();
    }
  };

  return null; // 이 컴포넌트는 렌더링을 하지 않고 마커를 지도에 추가하기만 합니다.
};

export default MapDisplay;
