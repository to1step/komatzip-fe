import { useEffect, useRef } from 'react';
import { StoreEntireInfo } from '@to1step/propose-backend';

interface MapDisplayProps {
  map: kakao.maps.Map | null;
  markersData: StoreEntireInfo[];
  myPosition: { lat: number; lng: number } | null;
}

const MapDisplay = ({ map, markersData, myPosition }: MapDisplayProps) => {
  const infowindowRef = useRef<kakao.maps.InfoWindow | null>(null);

  useEffect(() => {
    if (map) {
      const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
      infowindowRef.current = infowindow;

      markersData.forEach((markerInfo) => {
        const markerPosition = new window.kakao.maps.LatLng(
          markerInfo.coordinates[1],
          markerInfo.coordinates[0],
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          displayInfoWindow(marker, markerInfo.name, map);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          closeInfoWindow();
        });

        marker.setMap(map);
      });

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

        window.kakao.maps.event.addListener(
          myPositionMarker,
          'mouseover',
          () => {
            displayInfoWindow(myPositionMarker, '내 위치', map);
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
    marker: kakao.maps.Marker,
    title: string,
    map: kakao.maps.Map | null,
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

  return null;
};

export default MapDisplay;
