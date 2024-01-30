import { useEffect, useState, useRef } from 'react';
import axiosInstance from '../../api/apiInstance';
import MarkerList from './MarkerList';
import { StoreEntireInfo } from '@to1step/propose-backend';
import MapModal from './MapModal';
import MapDisplay from './MapDisplay';
import { RootState } from '../../redux/module';
import { useSelector } from 'react-redux';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const [activeMarkerTitle, setActiveMarkerTitle] = useState<string | null>(
    null,
  );
  const [visibleMarkers, setVisibleMarkers] = useState<StoreEntireInfo[]>([]);
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [myPosition, setMyPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<StoreEntireInfo | null>(
    null,
  );
  const address = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/v1/stores/location?region=${encodeURIComponent(address)}`,
        );

        const markersData: StoreEntireInfo[] = Array.isArray(data) ? data : [];

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
          import.meta.env.VITE_JAVASCRIPT_KEY
        }&autoload=false`;
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
  }, [address]);

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
    const recommendedCourses = visibleMarkers.filter((marker) => {
      const markerLng = marker.coordinates[0];
      const markerLat = marker.coordinates[1];
      const distance = Math.sqrt(
        Math.pow(clickedLng - markerLng, 2) +
          Math.pow(clickedLat - markerLat, 2),
      );

      return distance < 1.1;
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
      displayInfoWindow(null, markerInfo.name);
    }
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const displayInfoWindow = (
    marker: kakao.maps.Marker | null,
    title: string,
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
          className="my-position-button bg-blue-400 text-white text-xl font-bold py-3 px-6 rounded absolute bottom-[42%] left-6 md:bottom-10 md:left-12 z-10"
          onClick={moveToMyPosition}
        >
          현재 위치
        </button>
      </div>
      <MapDisplay
        map={map}
        markersData={visibleMarkers}
        myPosition={myPosition}
      />
      <MarkerList
        markers={visibleMarkers}
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
