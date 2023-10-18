import React from 'react';
import KakaoMap from '../components/Kakaomap/KakaoMap';
import Header from '../components/Commons/Header';

const MapPage: React.FC = () => {
  return (
    <div>
      <header>
        <Header showTitle={false} showBackButtonIcon={true} />
      </header>
      <KakaoMap />
    </div>
  );
};

export default MapPage;
