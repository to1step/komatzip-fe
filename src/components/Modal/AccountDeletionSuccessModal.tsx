import { useEffect } from 'react';

interface AccountDeletionSuccessModalProps {
  onClose: () => void;
  history: (path: string) => void;
}

const AccountDeletionSuccessModal = ({
  onClose,
  history,
}: AccountDeletionSuccessModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      history('/'); // 홈 화면으로 리다이렉트
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, history]);

  return (
    <div className="z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-80">
      <div className="bg-white w-1/4 relative p-4">
        <h1 className="text-xl m-3">탈퇴가 완료되었습니다.</h1>
      </div>
    </div>
  );
};

export default AccountDeletionSuccessModal;
