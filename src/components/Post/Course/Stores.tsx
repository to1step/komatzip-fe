import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';
import { Store } from '@to1step/propose-backend';

const CAROUSEL_ITEM_HEIGHT = 200;
const VISIBLE_ITEMS = 4;

// 각 가게 UUID를 가게 이름으로 변환하는 컴포넌트
const mapStoresToNames = async (storeIds: string[]) => {
  const storeInfo = [];

  for (const storeUUID of storeIds) {
    try {
      const response = await axiosInstance.get(`v1/stores/${storeUUID}`);
      const storeData = response.data;

      // 카테고리 값에 따라 카테고리 문자열 설정
      let categoryString: string;
      switch (storeData.category) {
        case 0:
          categoryString = '☕';
          break;
        case 1:
          categoryString = '🥞';
          break;
        case 2:
          categoryString = '⛲';
          break;
        default:
          categoryString = '✨';
          break;
      }

      // 가게 이름을 추출하여 배열에 추가
      const storeInfoItem = {
        ...storeData,
        category: categoryString,
      };

      storeInfo.push(storeInfoItem);
    } catch (error) {
      console.log('가게 이름을 추출하여 배열에 추가 중에 에러 발생: ${error}');
    }
  }
  return storeInfo;
};

interface StoresProps {
  stores: string[];
}

const Stores = ({ stores }: StoresProps) => {
  const [storeInfo, setStoreInfo] = useState<Store[]>([]);
  const [carouselPosition, setCarouselPosition] = useState(0);

  useEffect(() => {
    // 가게 UUID를 이름으로 변환
    mapStoresToNames(stores)
      .then((info) => setStoreInfo(info))
      .catch((error) => console.log('가게 이름으로 변환 중 에러 발생:', error));
  }, [stores]);

  const scrollCarousel = (direction: 'up' | 'down') => {
    const container = document.getElementById('carousel-container');

    if (!container) {
      return;
    }

    const newPosition =
      direction === 'up'
        ? Math.max(0, carouselPosition - 1)
        : Math.min(storeInfo.length - VISIBLE_ITEMS, carouselPosition + 1);

    setCarouselPosition(newPosition);

    // 아래로 스크롤(Down) 버튼이 작동하도록 다음과 같이 수정합니다.
    if (direction === 'down') {
      container.scrollTop =
        (newPosition + VISIBLE_ITEMS) * CAROUSEL_ITEM_HEIGHT;
    } else {
      container.scrollTop = newPosition * CAROUSEL_ITEM_HEIGHT;
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center items-center mt-4 ml-2 z-10">
        <button onClick={() => scrollCarousel('up')}>&#8593;</button>
      </div>
      <div
        id="carousel-container"
        className="relative"
        style={{
          maxHeight: '150px',
          overflow: 'scroll',
        }}
      >
        <div
          style={{
            height: 'auto',
            transition: 'transform 0.3s ease',
            transform: `translateY(-${
              carouselPosition * CAROUSEL_ITEM_HEIGHT
            }px)`,
          }}
        >
          {storeInfo.map((info, index) => (
            <div key={`store-${index}`} className="text-lg relative">
              <div className="absolute h-full border-l-8 border-black border-orange-300 m-2.5"></div>
              <div>
                <div className="relative">
                  <span className="absolute text-[20px]">{info.category}</span>
                  <span className="ml-10">{info.name}</span>
                </div>
              </div>
              {index !== storeInfo.length - 1 && <br />}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 ml-2 z-10">
        <button onClick={() => scrollCarousel('down')}>&#8595;</button>
      </div>
    </div>
  );
};

export default Stores;
