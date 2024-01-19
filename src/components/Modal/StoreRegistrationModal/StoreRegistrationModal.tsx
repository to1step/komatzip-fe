import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';
import axiosInstance from '../../../api/apiInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStoreFormSchema } from '../../../schemas/storeFormSchema';
import AddressInput from '../../AddressInput';

interface StoreRegistrationModalProps {
  closeModal: () => void;
}

const StoreRegistrationModal = ({
  closeModal,
}: StoreRegistrationModalProps) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateStoreForm>({
    resolver: zodResolver(createStoreFormSchema),
  });
  const [selectedCategory] = useState<number | null>(null);

  // const [selectedStartTime] = useState<string>('');
  // const [selectedEndTime] = useState<string>('');

  // const { append } = useFieldArray({
  //   control,
  //   name: 'images',
  // });

  const modalRef = useRef<HTMLDivElement | null>(null);

  const [location, setLocation] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleAddressSelected = (
    address: string,
    coordinates: [number, number],
  ) => {
    setLocation(address);
    setCoordinates(coordinates);
    setValue('coordinates', coordinates);
    setValue('location', address);
    console.log('handleAddressSelected - address: ', address);
    console.log('handleAddressSelected - coordinates: ', coordinates);
  };

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
  console.log(errors);
  const onSubmit: SubmitHandler<CreateStoreForm> = async (data) => {
    try {
      data.category = Number(data.category);
      createStoreFormSchema.parse(data);
      console.log('보내는 요청은', data);

      const postData = {
        ...data, // TODO: 한 번 더 가공해서 보내기
        category: selectedCategory,
        coordinates: coordinates,
        // coordinates:
        //   Array.isArray(data.coordinates) && data.coordinates.length >= 2
        //     ? data.coordinates.map((i) => parseFloat(i))
        //     : [0, 0],
        // startTime: null,
        // endTime: null,
        // tags: data.tags.map((tag: string) => tag.trim()),
      };
      const response = await axiosInstance.post('/v1/stores', postData);

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
        className="bg-white p-4 rounded shadow-md
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex justify-end items-center ml-auto"
          onClick={closeModal}
        >
          X
        </button>
        <h1 className="font-black text-xl text-center">가게 등록 모달</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h3>가게 이름*</h3>
            <input
              type="text"
              {...register('name')}
              placeholder="가게 이름 입력"
              className={`border-[1px] ${
                errors.name ? 'border-red-500' : 'border-gray-40'
              }`}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </label>

          <label>
            <h3>카테고리*</h3>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <div>
                  <input
                    type="radio"
                    value={0}
                    checked={field.value === 0}
                    onChange={() => field.onChange(0)}
                  />
                  <label>식당</label>
                  <input
                    type="radio"
                    value={1}
                    checked={field.value === 1}
                    onChange={() => field.onChange(1)}
                  />
                  <label>카페</label>
                  <input
                    type="radio"
                    value={2}
                    checked={field.value === 2}
                    onChange={() => field.onChange(2)}
                  />
                  <label>공원</label>
                </div>
              )}
            />
            {errors.category && (
              <p className="text-red-500">카테고리를 선택해주세요</p>
            )}
          </label>

          <label>
            <h3>설명</h3>
            <input
              type="textarea"
              {...register('description')}
              placeholder="설명 입력"
              className={`border-[1px] ${
                errors.description ? 'border-red-500' : 'border-gray-40'
              }`}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </label>

          <label>
            <h3>위치</h3>
            <Controller
              control={control}
              name="coordinates"
              render={({ field }) => (
                <AddressInput
                  onAddressSelected={(address, coordinates) => {
                    handleAddressSelected(address, coordinates);
                    field.onChange(coordinates);
                  }}
                />
              )}
            />
            <p>선택한 주소: {location ? location : '주소를 선택하세요.'}</p>
            <p>
              선택한 좌표:{' '}
              {coordinates ? coordinates.join(', ') : '좌표를 선택하세요.'}
            </p>
          </label>

          {/* <Controller
            name="representImage"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <div>
                <h3>이미지 등록</h3>
                {field.value && (
                  <div>
                    <img
                      src={field.value}
                      alt="Representative Image"
                      style={{ width: '100px', height: 'auto' }}
                    />
                    <button type="button" onClick={() => field.onChange(null)}>
                      이미지 삭제
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        field.onChange(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      field.onChange(null);
                    }
                  }}
                />
                <button type="button" onClick={() => append(null)}>
                  추가
                </button>
              </div>
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const tag = e.currentTarget.value.trim();
                      field.onChange([...field.value, tag]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <ul>
                  {field.value.map((tag, index) => (
                    <li key={index}>
                      <span>{tag}</span>
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
            rules={{ required: false }}
            render={({
              field,
            }: {
              field: {
                value: string | null;
                onChange: (value: string) => void;
              };
            }) => (
              <section>
                <h3>매장 운영 시작 시간</h3>
                <input
                  type="time"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </section>
            )}
          />
          <Controller
            name="endTime"
            rules={{ required: false }}
            control={control}
            render={({ field }) => (
              <section>
                <h3>매장 운영 종료 시간</h3>
                <input
                  type="time"
                  value={selectedEndTime || ''}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </section>
            )}
          /> */}
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
