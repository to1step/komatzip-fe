import { useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    daum: any;
  }
}

interface AddressInputProps {
  onAddressSelected: (address: string, coordinates: [number, number]) => void;
}

const AddressInput = ({ onAddressSelected }: AddressInputProps) => {
  const handleClick = async () => {
    new window.daum.Postcode({
      oncomplete: async (data: { address: string; zonecode: string }) => {
        const response = await axios.get(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`,
          {
            headers: {
              Authorization: `KakaoAK a055e717c1cb42e8ee196835ba48dfcf`,
            },
          },
        );
        const location = response.data.documents[0].address;
        const coordinates: [number, number] = [location.x, location.y];
        onAddressSelected(data.address, coordinates);
      },
    }).open();
  };

  return (
    <div>
      <button onClick={handleClick}>주소 검색</button>
    </div>
  );
};

export default AddressInput;
