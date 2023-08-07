import React, { useEffect, useState, useRef } from 'react';
import MarkerList from './MarkerList';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MarkerInfo {
  title: string;
  lat: number;
  lng: number;
}

const KakaoMap: React.FC = () => {
  const markersData: MarkerInfo[] = [
    { title: '맛집1', lat: 37.5665, lng: 126.978 },
    { title: '맛집2', lat: 37.5645, lng: 126.98 },
    { title: '맛집3', lat: 37.5625, lng: 126.979 },
    { title: '맛집4', lat: 37.5635, lng: 126.976 },
    { title: '맛집5', lat: 37.5628, lng: 126.975 },
    { title: '맛집6', lat: 37.564, lng: 126.973 },
    { title: '맛집7', lat: 37.5637, lng: 126.982 },
  ];

  const [activeMarkerTitle, setActiveMarkerTitle] = useState<string | null>(
    null,
  );
  const [visibleMarkers, setVisibleMarkers] = useState<MarkerInfo[]>([]);

  const visibleMarkersRef = useRef<MarkerInfo[]>([]);
  const infowindowRef = useRef<window.kakao.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<window.kakao.maps.Map | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=8494ed9ba10ea55ff5cf793934c04231&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('kakao-map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 4,
        };
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

        markersData.forEach((markerInfo) => {
          const markerPosition = new window.kakao.maps.LatLng(
            markerInfo.lat,
            markerInfo.lng,
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          window.kakao.maps.event.addListener(marker, 'mouseover', function () {
            displayInfoWindow(marker, markerInfo.title, map);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', function () {
            closeInfoWindow();
          });

          marker.setMap(map);
        });
      });
    };
  }, []);

  function displayInfoWindow(
    marker: window.kakao.maps.Marker,
    title: string,
    map: window.kakao.maps.Map | null,
  ) {
    const infowindow = infowindowRef.current;
    if (infowindow && map) {
      infowindow.setContent(title);
      infowindow.open(map, marker);
      setActiveMarkerTitle(title);
    }
  }

  function closeInfoWindow() {
    const infowindow = infowindowRef.current;
    if (infowindow !== null) {
      infowindow.close();
      setActiveMarkerTitle(null);
    }
  }

  return (
    <div className="relative">
      <div id="kakao-map" style={{ width: '1200px', height: '600px' }}></div>
      <MarkerList
        markers={visibleMarkersRef.current}
        activeMarkerTitle={activeMarkerTitle}
      />
    </div>
  );
};

export default KakaoMap;
