import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';

interface CopyAddressButtonProps {
  location: string;
}

const CopyAddressButton = ({ location }: CopyAddressButtonProps) => {
  const [isCopyAddress, setIsCopyAddress] = useState<boolean>(false);

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(location);
      setIsCopyAddress(true);
    } catch (e) {
      console.log(e);
    }
    setIsCopyAddress(false);
  };

  return (
    <div onClick={handleCopyAddress}>
      <BiCopy />
    </div>
  );
};

export default CopyAddressButton;
