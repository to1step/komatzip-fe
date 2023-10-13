import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';
import { StoreEntireInfo } from '@to1step/propose-backend';
import PostModal from '../../PostModal/PostModal';

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
  const [storeInfo, setStoreInfo] = useState<StoreEntireInfo[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreEntireInfo | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 가게 UUID를 이름으로 변환
    mapStoresToNames(stores)
      .then((info) => setStoreInfo(info))
      .catch((error) => console.log('가게 이름으로 변환 중 에러 발생:', error));
  }, [stores]);

  const openModal = (store: StoreEntireInfo) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setSelectedStore(null);
    setIsModalOpen(false);
  }, []);

  const handleDocumentClick = useCallback(
    (e: MouseEvent) => {
      if (isModalOpen) {
        const modal = document.querySelector('.modal');
        if (modal && !modal.contains(e.target as Node)) {
          closeModal();
        }
      }
    },
    [isModalOpen, closeModal],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <div className="relative flex-row justify-center items-center mx-1 cursor-pointer transition-all duration-300 ease-in-out transform  hover:ring-4 hover:ring-amber-500 hover:rounded-xl">
      {storeInfo.map((info, index) => (
        <div
          key={`store-${index}`}
          className="text-l relative "
          onClick={() => openModal(info)}
        >
          <div className="absolute h-full border-l-8 border-black  border-orange-300 m-2.5"></div>
          <div>
            <div className="relative">
              <span className="absolute text-[20px]">{info.category}</span>
              <span className="ml-10">{info.name}</span>
            </div>
          </div>
          {index !== storeInfo.length - 1 && <br />}
        </div>
      ))}

      {isModalOpen && selectedStore && (
        <PostModal store={selectedStore} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Stores;
