import { useCallback, useState } from 'react';
import ModalComponent from '../Modal/ModalComponent';
import StoreRegistrationModal from '../Modal/StoreRegistrationModal/StoreRegistrationModal';
import { IoAlertCircleOutline } from 'react-icons/io5';

const SelectedStoreList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return data.length === 0 ? (
    <section className="h-[300px] w-2/3 flex flex-col items-center justify-center m-auto relative z-3">
      <div>
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
  ) : (
    ''
  );
};

export default SelectedStoreList;
