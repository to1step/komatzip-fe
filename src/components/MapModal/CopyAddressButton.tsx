import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
interface CopyAddressButtonProps {
  address: string;
  location: string;
}

const CopyAddressButton: React.FC<CopyAddressButtonProps> = ({ location }) => {
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

  return <BiCopy onClick={() => handleCopyAddress()} />;
};

export default CopyAddressButton;
