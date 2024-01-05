import { useEffect, useRef, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';
import axiosInstance from '../../../api/apiInstance';

interface StoreRegistrationModalProps {
  closeModal: () => void;
}

const StoreRegistrationModal = ({
  closeModal,
}: StoreRegistrationModalProps) => {
  const { control, handleSubmit, register } = useForm<CreateStoreForm>();

  const [selectedStartTime] = useState<string>('');
  const [selectedEndTime] = useState<string>('');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'images',
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

  const onSubmit: SubmitHandler<CreateStoreForm> = async (data) => {
    try {
      const response = await axiosInstance.post('/api/v1/stores', data);

      if (response.data === 200) {
        console.log('🚀 등록 성공');
        //TODO: alert 창으로 변경
      }
    } catch (error) {
      console.log('🚀 등록 실패', error);
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
        <button onClick={closeModal}>X</button>
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
                <input type="text" {...field} placeholder="가게 이름 입력" />
              </label>
            )}
          />
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={() => (
              <label>
                <h3>카테고리</h3>
                <input type="radio" value="식당" {...register('category')} />
                <button>식당</button>
                <input type="radio" value="카페" {...register('category')} />
                <button>카페</button>
                <input type="radio" value="공원" {...register('category')} />
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
                <input type="textarea" {...field} placeholder="설명 입력" />
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
                <input type="text" {...field} placeholder="위치 입력" />
              </label>
            )}
          />
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            rules={{ required: false }}
            render={({ field }) => (
              <div>
                <label>
                  <h3>태그</h3>
                </label>
                <input
                  type="text"
                  placeholder="태그 입력"
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    field.onChange([...field.value, e.currentTarget.value])
                  }
                />
                <ul>
                  {field.value.map((tag, index) => (
                    <li key={index}>
                      {tag}
                      <button
                        type="button"
                        onClick={() =>
                          field.onChange(
                            field.value.filter((_, i) => i !== index),
                          )
                        }
                      >
                        삭제
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
          <Controller
            name="startTime"
            control={control}
            render={({
              field,
            }: {
              field: { value: string; onChange: (value: string) => void };
            }) => (
              <section>
                <h3>매장 운영 시작 시간</h3>
                <input type="time" value={selectedStartTime || ''} {...field} />
              </section>
            )}
          />
          <Controller
            name="endTime"
            control={control}
            render={({ field }) => (
              <section>
                <h3>매장 운영 종료 시간</h3>
                <input type="time" value={selectedEndTime || ''} {...field} />
              </section>
            )}
          />
          <button type="submit" className="border border-black rounded mr-2">
            등록
          </button>
          <button onClick={closeModal} className="border border-black rounded">
            닫기
          </button>
        </form>
      </article>
    </div>
  );
};

export default StoreRegistrationModal;
