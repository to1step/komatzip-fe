import { useEffect, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';
import { Store } from '@to1step/propose-backend';

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

  useEffect(() => {
    // 가게 UUID를 이름으로 변환
    mapStoresToNames(stores)
      .then((info) => setStoreInfo(info))
      .catch((error) => console.log('가게 이름으로 변환 중 에러 발생:', error));
  }, [stores]);

  return (
    <div>
      {storeInfo.map((info, index) => (
        <div key={`store-${index}`} className="text-lg relative">
          <div className="absolute h-full border-l-8 border-black border-orange-300 m-2"></div>
          <div>
            <div className="relative">
              <span className="absolute">{info.category}</span>
              <span className="ml-10">{info.name}</span>
            </div>
          </div>
          {index !== storeInfo.length - 1 && <br />}
        </div>
      ))}
    </div>
  );
};

export default Stores;
