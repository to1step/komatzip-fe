import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import axiosInstance from '../../../api/apiInstance';

interface StoreRegistrationModalProps {
  closeModal: () => void;
}

const StoreRegistrationModal = ({
  closeModal,
}: StoreRegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    location: '',
    coordinates: '',
    representImage: '',
    tags: '',
    startTime: '',
    endTime: '',
  });

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/v1/stores', {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        coordinates: formData.coordinates,
      });

      if (response.status === 200) {
        console.log('성공');
      }
    } catch (error) {
      console.log('가게 등록 실패', error);
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={(event: React.MouseEvent) => {
        if (event.target === modalRef.current) {
          closeModal();
        }
      }}
    >
      <article
        className="bg-white p-4 rounded shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2" onClick={closeModal}>
          X
        </button>
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

          {/* 
                    // TODOcategory: '',
    description: '',
    location: '',
    coordinates: '', */}
          <label>
            <h3>카테고리</h3>
            <input
              type="radio"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <button>식당</button>
            <input
              type="radio"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <button>카페</button>
            <input
              type="radio"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
            <button>공원</button>
          </label>
          <button type="submit">등록</button>
          <button onClick={closeModal}>닫기</button>
        </form>
      </article>
    </div>
  );
};

export default StoreRegistrationModal;
