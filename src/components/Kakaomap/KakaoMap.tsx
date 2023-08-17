import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MarkerList from './MarkerList';
import { Store } from '@to1step/propose-backend';
import MapModal from './MapModal';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerInfo {
  title: string;
  lat: number;
  lng: number;
  address: string;
}

interface KakaoMapProps {}

const KakaoMap: React.FC<KakaoMapProps> = ({}) => {
  const [activeMarkerTitle, setActiveMarkerTitle] = useState<string | null>(
    null,
  );
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerInfo[]>([]);
  const visibleMarkersRef = useRef<MarkerInfo[]>([]);
  const infowindowRef = useRef<window.kakao.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<window.kakao.maps.Map | null>(null);
  const [myPosition, setMyPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const region = '서울시 마포구';
        const { data } = await axios.get(
          `https://api.to1step.shop/v1/stores/location?region=${encodeURIComponent(
            region,
          )}`,
        );

        let markersData: MarkerInfo[] = [];

        if (Array.isArray(data.data)) {
          markersData = data.data.map((store: Store) => ({
            title: store.name,
            lat: store.coordinates[1],
            lng: store.coordinates[0],
            address: store.location,
          }));
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&autoload=false`; // 카카오 지도 앱 키 추가
        document.head.appendChild(script);

        script.onload = () => {
          window.kakao.maps.load(() => {
            const container = document.getElementById('kakao-map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5665, 126.978),
              level: 4,
            };

            // 현재 위치 가져오기
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setMyPosition({ lat: latitude, lng: longitude });
                  options.center = new window.kakao.maps.LatLng(
                    latitude,
                    longitude,
                  );

                  // 지도 생성 및 초기화
                  const map = new window.kakao.maps.Map(container, options);
                  setMap(map);
                  const infowindow = new window.kakao.maps.InfoWindow({});
                  infowindowRef.current = infowindow;

                  const updateVisibleMarkers = () => {
                    const bounds = map.getBounds();
                    if (bounds) {
                      const visibleMarkers = markersData.filter((marker) =>
                        bounds.contain(
                          new window.kakao.maps.LatLng(marker.lat, marker.lng),
                        ),
                      );
                      setVisibleMarkers(visibleMarkers);
                      if (visibleMarkersRef.current) {
                        visibleMarkersRef.current = visibleMarkers;
                      }
                    }
                  };

                  window.kakao.maps.event.addListener(
                    map,
                    'dragend',
                    updateVisibleMarkers,
                  );
                  window.kakao.maps.event.addListener(
                    map,
                    'zoom_changed',
                    updateVisibleMarkers,
                  );

                  markersData.forEach((markerInfo) => {
                    const markerPosition = new window.kakao.maps.LatLng(
                      markerInfo.lat,
                      markerInfo.lng,
                    );

                    const marker = new window.kakao.maps.Marker({
                      position: markerPosition,
                    });

                    // 마커 이벤트 리스너 추가 (마우스 오버 시 인포윈도우 표시)
                    window.kakao.maps.event.addListener(
                      marker,
                      'mouseover',
                      () => {
                        displayInfoWindow(
                          marker,
                          markerInfo.title,
                          map,
                          markerInfo.lat,
                          markerInfo.lng,
                        );
                      },
                    );

                    window.kakao.maps.event.addListener(
                      marker,
                      'mouseout',
                      () => {
                        closeInfoWindow();
                      },
                    );

                    marker.setMap(map);
                  });

                  // "내 위치" 마커 및 인포윈도우 추가
                  const myPositionMarker = new window.kakao.maps.Marker({
                    position: options.center,
                    image: new window.kakao.maps.MarkerImage(
                      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                      new window.kakao.maps.Size(24, 35),
                    ),
                  });

                  window.kakao.maps.event.addListener(
                    myPositionMarker,
                    'mouseover',
                    () => {
                      displayInfoWindow(
                        myPositionMarker,
                        '내 위치',
                        map,
                        latitude,
                        longitude,
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
                },
                (error) => {
                  console.error('Error getting current position:', error);
                  // 현재 위치를 가져올 수 없는 경우 기본 지도만 생성
                  const map = new window.kakao.maps.Map(container, options);
                  setMap(map);
                },
              );
            } else {
              // 현재 위치를 지원하지 않는 경우 기본 지도만 생성
              const map = new window.kakao.maps.Map(container, options);
              setMap(map);
            }
          });
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMarkerClick = (markerInfo: MarkerInfo) => {
    setSelectedMarker(markerInfo);
  };

  const handleMarkerMouseOver = (markerInfo: MarkerInfo) => {
    const markerPosition = new window.kakao.maps.LatLng(
      markerInfo.lat,
      markerInfo.lng,
    );

    if (map) {
      map.panTo(markerPosition); // 해당 마커로 지도 중심 이동
      displayInfoWindow(
        null, // 인포윈도우를 열지 않으므로 null 전달
        markerInfo.title,
        map,
        markerInfo.lat,
        markerInfo.lng,
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const displayInfoWindow = (
    marker: window.kakao.maps.Marker | null,
    title: string,
    map: window.kakao.maps.Map | null,
    lat: number,
    lng: number,
  ) => {
    const infowindow = infowindowRef.current;
    if (infowindow && map) {
      infowindow.setContent(
        `<div class="p-2 bg-white text-orange-500 rounded-md shadow-md">${title}</div>`,
      );
      if (marker) {
        infowindow.open(map, marker);
      } else {
        infowindow.close();
      }
      setActiveMarkerTitle(title);
    }
  };

  const closeInfoWindow = () => {
    const infowindow = infowindowRef.current;
    if (infowindow !== null) {
      infowindow.close();
      setActiveMarkerTitle(null);
    }
  };

  const moveToMyPosition = () => {
    if (myPosition && map) {
      const center = new window.kakao.maps.LatLng(
        myPosition.lat,
        myPosition.lng,
      );
      map.setCenter(center);
    }
  };

  return (
    <div className="relative">
      <div id="kakao-map" style={{ width: '1650px', height: '900px' }}>
        <button
          className="my-position-button bg-red-400 text-white font-bold py-2 px-4 rounded absolute bottom-4 left-4 z-10"
          onClick={moveToMyPosition}
        >
          내 위치
        </button>
      </div>
      <MarkerList
        markers={visibleMarkersRef.current}
        activeMarkerTitle={activeMarkerTitle}
        onMarkerClick={handleMarkerClick}
        onMarkerMouseOver={handleMarkerMouseOver}
      />
      <MapModal markerInfo={selectedMarker} onClose={handleCloseModal} />
    </div>
  );
};

export default KakaoMap;