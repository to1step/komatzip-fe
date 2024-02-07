import KakaoMap from '../../components/Kakaomap/KakaoMap';
import Header from '../../components/Commons/Header';

const MapPage = () => {
  return (
    <div>
      <header>
        <Header
          showTitle={false}
          showBackButtonIcon={true}
          showHamburgerButton={true}
        />
      </header>
      <KakaoMap />
    </div>
  );
};

export default MapPage;
