import { useCallback, useEffect, useState } from 'react';
import ModalComponent from '../Modal/ModalComponent';
import StoreRegistrationModal from '../Modal/StoreRegistrationModal/StoreRegistrationModal';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { Store, StoreEntireInfo } from '@to1step/propose-backend';

interface SelectedStoreListProps {
  storeData: Store | StoreEntireInfo | null;
}
const SelectedStoreList = ({ storeData }: SelectedStoreListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {}, [storeData]);

  if (!storeData) {
    return <div className="loading-state">정보를 가져오는 중...</div>;
  }

  return (
    <section className="h-[300px] w-2/3 flex flex-col items-center justify-center m-auto relative z-3 text-center">
      <div className="flex flex-col items-center justify-center">
        <IoAlertCircleOutline size={26} />
        <h3>등록된 가게가 없습니다.</h3>
        <button onClick={() => openModal()} className="font-semibold">
          등록하러 가기
        </button>
      </div>

      {isModalOpen && (
        <ModalComponent>
          <StoreRegistrationModal closeModal={closeModal} />
        </ModalComponent>
      )}
    </section>
  );
};

export default SelectedStoreList;
