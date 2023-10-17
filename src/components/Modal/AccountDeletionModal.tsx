import axiosInstance from '../../api/apiInstance';

interface AccountDeletionModalProps {
  closeModal: () => void;
  onAccountDeleted: () => void;
}

const AccountDeletionModal = ({
  closeModal,
  onAccountDeleted,
}: AccountDeletionModalProps) => {
  const handleDeleteAccount = async () => {
    try {
      await axiosInstance.delete('/v1/users/me');
      closeModal();
      onAccountDeleted(); // 탈퇴 성공 시 콜백 호출
    } catch (error) {
      console.error('😥 계정 삭제 중 에러:', error);
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
      <div className="bg-white w-1/4 relative p-4">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          X
        </button>
        <h1 className="text-xl m-3 text-red-500 text-center font-black">
          정말 탈퇴하시겠습니까?
        </h1>
        <section className="flex justify-center items-center">
          <button className="font-semibold m-3" onClick={handleDeleteAccount}>
            탈퇴하기
          </button>
          <button className="font-black m-3" onClick={closeModal}>
            돌아가기
          </button>
        </section>
      </div>
    </div>
  );
};

export default AccountDeletionModal;
