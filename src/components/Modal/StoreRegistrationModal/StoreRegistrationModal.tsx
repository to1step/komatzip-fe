import { useEffect, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';
import axiosInstance from '../../../api/apiInstance';

interface StoreRegistrationModalProps {
  closeModal: () => void;
}

const StoreRegistrationModal = ({
  closeModal,
}: StoreRegistrationModalProps) => {
  const { control, handleSubmit } = useForm<CreateStoreForm>();

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

  const onSubmit: SubmitHandler<CreateStoreForm> = async (data) => {
    try {
      const response = await axiosInstance.post('/api/v1/stores', data);

      if (response.data === 200) {
        console.log('등록 성공');
        //TODO: alert 창으로 변경
      }
    } catch (error) {
      console.log('등록 실패', error);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <label>
                <h3>가게 이름</h3>
                <input type="text" {...field} />
              </label>
            )}
          />
          <Controller
            name="category"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={() => (
              <label>
                <h3>카테고리</h3>
                <input type="radio" value="식당" />
                <button>식당</button>
                <input type="radio" value="카페" />
                <button>카페</button>
                <input type="radio" value="공원" />
                <button>공원</button>
              </label>
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <label>
                <h3>설명</h3>
                <input type="textarea" {...field} />
              </label>
            )}
          />
          <Controller
            name="location"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <label>
                <h3>위치</h3>
                <input type="text" {...field} />
              </label>
            )}
          />
          <button type="submit">등록</button>
          <button onClick={closeModal}>닫기</button>
        </form>
      </article>
    </div>
  );
};

export default StoreRegistrationModal;
