import { useEffect, useRef } from 'react';
import { Store } from '@to1step/propose-backend';

// 모달에서 정적지도를 보여주는 컴포넌트
const PostModalMap = ({ coordinates }: Store) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // coordinates 배열이 적절한 값인지 확인
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      console.error('Invalid coordinates:', coordinates);
      return;
    }

    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=d9625d7b72cda469a44e36c806446dcb&autoload=false'; // autoload=false 추가
    script.async = false; // 동기적으로 로드

    // 스크립트가 로드된 후에 실행될 내용
    script.onload = () => {
      // window.kakao.maps 객체가 정의될 때까지 반복해서 확인
      const interval = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(interval); // 객체가 정의되면 setInterval 종료
          const mapContainer = mapContainerRef.current; // 지도를 표시할 div
          const mapOption = {
            center: new window.kakao.maps.LatLng(
              coordinates[0],
              coordinates[1],
            ),
            level: 2,
            mapTypeId: window.kakao.maps.MapTypeId.ROADMAP,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOption);

          mapInstanceRef.current = map;
        }
      }, 100);
    };

    // API 스크립트를 로드한 후 콜백 함수를 실행
    window.kakao.maps.load(() => {
      script.onload();
    });

    // 스크립트를 <head> 태그에 추가
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [coordinates]);

  return (
    <div
      ref={mapContainerRef}
      id="map"
      style={{ width: '300px', height: '100px' }}
    ></div>
  );
};

export default PostModalMap;
