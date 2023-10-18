import { IoChevronForwardSharp, IoCloseCircleOutline } from 'react-icons/io5';
import AccountDeletionModal from '../Modal/AccountDeletionModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountDeletionSuccessModal from '../Modal/AccountDeletionSuccessModal';

const AccountDeletion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const history = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <section className="flex">
      <IoCloseCircleOutline size={26} />
      <button
        className="text-l flex justify-center items-center"
        onClick={openModal}
      >
        <h2 className="text-xl font-semibold mx-3">회원탈퇴</h2>
        <IoChevronForwardSharp size={20} />
      </button>
      {isModalOpen && (
        <AccountDeletionModal
          closeModal={closeModal}
          onAccountDeleted={openSuccessModal}
        />
      )}
      {isSuccessModalOpen && (
        <AccountDeletionSuccessModal
          onClose={closeSuccessModal}
          history={history}
        />
      )}
    </section>
  );
};

export default AccountDeletion;
