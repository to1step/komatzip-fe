import { ChangeEvent, FormEvent, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';

interface StoreRegistrationModalProps {
  onClose: () => void;
}

const StoreRegistrationModal = ({ onClose }: StoreRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    coordinates: '',
    // representImage: ''
    // tags: ''
    // startTime:''
    // endTime: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/v1/stores', formData);

      if (response.status === 200) {
        console.log('성공');
      }
    } catch (error) {
      console.log('가게 등록 실패', error);
    }
  };

  return (
    <div onClick={onClose}>
      <article onClick={(e) => e.stopPropagation}>
        <button onClick={onClose}>X</button>
        <h2>가게 등록 모달</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <h3>가게 이름</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </form>
        <button onClick={onClose}>닫기</button>
      </article>
    </div>
  );
};

export default StoreRegistrationModal;
