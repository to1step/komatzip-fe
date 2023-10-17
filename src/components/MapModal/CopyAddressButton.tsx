import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { success } from '../../util/toastify';

interface CopyAddressButtonProps {
  location: string;
}

const CopyAddressButton = ({ location }: CopyAddressButtonProps) => {
  const [isCopyAddress, setIsCopyAddress] = useState<boolean>(false);

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(location);
      setIsCopyAddress(true);
      success('주소가 복사되었습니다.');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div onClick={handleCopyAddress}>
      <BiCopy color="#FF3257" />
    </div>
  );
};

export default CopyAddressButton;
