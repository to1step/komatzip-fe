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
  const [representImage, setRepresentImage] = useState<string | null>(null);

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
  };

  const handleCategoryChange = (value: number) => {
    setValue('category', value);
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('images', file);

      const response = await axiosInstance.post('/v1/images', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data?.imageLocationList?.[0];

      if (imageUrl) {
        return imageUrl;
      } else {
        throw new Error('Image URL not found in response data');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        setRepresentImage(imageUrl);
      } catch (error) {
        console.error('Failed to handle image change:', error);
      }
    }
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
  const onSubmit: SubmitHandler<CreateStoreForm> = async (data) => {
    try {
      data.category = Number(data.category);
      createStoreFormSchema.parse(data);
      console.log('보내는 요청은', data);

      // 이미지가 없을 경우 빈 문자열
      const representImageUrl = representImage || '';

      const postData = {
        ...data, // TODO: 한 번 더 가공해서 보내기
        category: data.category,
        coordinates: coordinates ? coordinates.map(Number) : [0, 0],
        representImage: representImageUrl,
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
              render={({ field, fieldState }) => (
                <div>
                  <input
                    type="radio"
                    value={0}
                    checked={field.value === 0}
                    onChange={() => handleCategoryChange(0)}
                  />
                  <label>식당</label>
                  <input
                    type="radio"
                    value={1}
                    checked={field.value === 1}
                    onChange={() => handleCategoryChange(1)}
                  />
                  <label>카페</label>
                  <input
                    type="radio"
                    value={2}
                    checked={field.value === 2}
                    onChange={() => handleCategoryChange(2)}
                  />
                  <label>공원</label>
                  {fieldState?.error && (
                    <p className="text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
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
                    field.onChange(coordinates.map(Number) as [number, number]);
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

          <label>
            <h3>대표 이미지*</h3>
            <div>
              <Controller
                control={control}
                name="representImage"
                defaultValue=""
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      onChange={(e) => {
                        field.onChange(e);
                        handleImageChange(e);
                      }}
                      className="hidden"
                    />
                    <div
                      className={`border-[1px] ${
                        errors.representImage
                          ? 'border-red-500'
                          : 'border-gray-40'
                      }`}
                      onClick={() => {
                        const input = document.querySelector<HTMLInputElement>(
                          'input[name="representImage"]',
                        );
                        input?.click();
                      }}
                    >
                      {representImage ? (
                        <img
                          src={representImage}
                          alt="Representative Image"
                          className="w-full h-auto"
                        />
                      ) : (
                        <p className="text-gray-500">
                          클릭하여 이미지를 업로드하세요.
                        </p>
                      )}
                    </div>
                  </>
                )}
              />
            </div>
            {errors.representImage && (
              <p className="text-red-500">{errors.representImage.message}</p>
            )}
          </label>
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
