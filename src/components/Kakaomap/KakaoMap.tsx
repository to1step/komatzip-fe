import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MarkerList from './MarkerList';
import { StoreEntireInfo } from '@to1step/propose-backend';
import MapModal from './MapModal';
import MapDisplay from './MapDisplay';

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {}

const KakaoMap: React.FC<KakaoMapProps> = ({}) => {
  const [activeMarkerTitle, setActiveMarkerTitle] = useState<string | null>(
    null,
  );
  const [visibleMarkers, setVisibleMarkers] = useState<StoreEntireInfo[]>([]);
  const visibleMarkersRef = useRef<StoreEntireInfo[]>([]);
  const infowindowRef = useRef<window.kakao.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<window.kakao.maps.Map | null>(null);
  const [myPosition, setMyPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<StoreEntireInfo | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const region = '서울특별시 은평구';
        const { data } = await axios.get(
          `https://api.to1step.shop/v1/stores/location?region=${encodeURIComponent(
            region,
          )}`,
        );

        let markersData: StoreEntireInfo[] = Array.isArray(data.data)
          ? data.data
          : [];

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8494ed9ba10ea55ff5cf793934c04231&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
          window.kakao.maps.load(() => {
            const container = document.getElementById('kakao-map');
            const options = {
              center: new window.kakao.maps.LatLng(37.5665, 126.978),
              level: 3,
            };

            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setMyPosition({ lat: latitude, lng: longitude });
                  options.center = new window.kakao.maps.LatLng(
                    latitude,
                    longitude,
                  );

                  const map = new window.kakao.maps.Map(container, options);
                  setMap(map);
                  const infowindow = new window.kakao.maps.InfoWindow({});
                  infowindowRef.current = infowindow;

                  const updateVisibleMarkers = () => {
                    const bounds = map.getBounds();
                    if (bounds) {
                      const visibleMarkers = markersData.filter((marker) =>
                        bounds.contain(
                          new window.kakao.maps.LatLng(
                            marker.coordinates[1],
                            marker.coordinates[0],
                          ),
                        ),
                      );
                      setVisibleMarkers(visibleMarkers);
                      visibleMarkersRef.current = visibleMarkers;
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
                },
                (error) => {
                  console.error('Error getting current position:', error);
                  const map = new window.kakao.maps.Map(container, options);
                  setMap(map);
                },
              );
            } else {
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

  const handleMarkerClick = (markerInfo: StoreEntireInfo) => {
    const recommendedCourses = calculateDistance(
      markerInfo.coordinates[0], // 클릭한 마커의 경도
      markerInfo.coordinates[1], // 클릭한 마커의 위도
    );

    setSelectedMarker(markerInfo);
    setRecommendedCourses(recommendedCourses);
  };

  const [recommendedCourses, setRecommendedCourses] = useState<
    StoreEntireInfo[]
  >([]);

  const calculateDistance = (clickedLng: number, clickedLat: number) => {
    const recommendedCourses = visibleMarkersRef.current.filter((marker) => {
      const markerLng = marker.coordinates[0];
      const markerLat = marker.coordinates[1];
      const distance = Math.sqrt(
        Math.pow(clickedLng - markerLng, 2) +
          Math.pow(clickedLat - markerLat, 2),
      );

      return distance < 2.1;
    });

    return recommendedCourses;
  };

  const handleMarkerMouseOver = (markerInfo: StoreEntireInfo) => {
    const markerPosition = new window.kakao.maps.LatLng(
      markerInfo.coordinates[1],
      markerInfo.coordinates[0],
    );

    if (map) {
      map.panTo(markerPosition);
      displayInfoWindow(
        null,
        markerInfo.name,
        markerInfo.coordinates[1],
        markerInfo.coordinates[0],
      );
    }
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const displayInfoWindow = (
    marker: window.kakao.maps.Marker | null,
    title: string,
    lat: number,
    lng: number,
  ) => {
    const infowindow = infowindowRef.current;
    if (infowindow && map) {
      infowindow.setContent(
        `<div class="p-2 ml-8 text-blue-500 text-lg">${title}</div>`,
      );
      if (marker) {
        infowindow.open(map, marker);
      } else {
        infowindow.close();
      }
      setActiveMarkerTitle(title);
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
      <div id="kakao-map" style={{ width: '100vw', height: '90vh' }}>
        <button
          className="my-position-button bg-blue-400 text-white text-xl font-bold py-3 px-6 rounded absolute bottom-[40px] left-12 z-10"
          onClick={moveToMyPosition}
        >
          현재 위치
        </button>
      </div>
      <MapDisplay
        map={map}
        markersData={visibleMarkersRef.current}
        myPosition={myPosition}
      />
      <MarkerList
        markers={visibleMarkersRef.current}
        activeMarkerTitle={activeMarkerTitle}
        onMarkerClick={handleMarkerClick}
        onMarkerMouseOver={handleMarkerMouseOver}
      />
      <MapModal
        markerInfo={selectedMarker}
        recommendedCourses={recommendedCourses}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default KakaoMap;
