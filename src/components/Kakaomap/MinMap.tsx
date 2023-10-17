import React, { useEffect } from 'react';

interface MiniMapProps {
  lat: number;
  lng: number;
}

const MiniMap: React.FC<MiniMapProps> = ({ lat, lng }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=8494ed9ba10ea55ff5cf793934c04231&autoload=false';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('mini-map');
        const options = {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 4,
        };

        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        new window.kakao.maps.Marker({
          position: markerPosition,
        }).setMap(map);
      });
    };
  }, [lat, lng]);

  return <div id="mini-map" style={{ width: '100%', height: '200px' }} />;
};

export default MiniMap;
