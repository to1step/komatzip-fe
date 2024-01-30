import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';
import axiosInstance from '../../../api/apiInstance';
import { zodResolver } from '@hookform/resolvers/zod';
import { createStoreFormSchema } from '../../../schemas/storeFormSchema';
import AddressInput from '../../AddressInput';
import { uploadImage } from './StoreApiUtils';
import StoreName from './StoreName';
import StoreCategory from './StoreCategory';
import StoreDescription from './StoreDescription';
import StoreRepresentImage from './StoreRepresentImage';
import StoreTag from './StoreTag';
import StoreOperationTime from './StoreOperationTime';
import { success } from '../../../util/toastify';

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
  const tagInputRef = useRef<HTMLInputElement | null>(null);
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
      if (response.data === true) {
        console.log('🚀 등록 성공');
        success('가게가 등록 되었습니다.');
        closeModal();
      }
    } catch (error) {
      console.log('🚀 등록 실패', error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 "
      ref={modalRef}
      onClick={(event: React.MouseEvent) => {
        if (event.target === modalRef.current) {
          closeModal();
        }
      }}
    >
      <article
        className="bg-white p-7 rounded shadow-md w-full max-w-lg sm:h-[600px] lg:h-[900px] overflow-y-auto "
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
          <StoreName register={register} errors={errors} />
          <StoreCategory control={control} />
          <StoreDescription register={register} errors={errors} />

          <label className="mt-4 block">
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

          <StoreRepresentImage
            control={control}
            name="representImage"
            defaultValue=""
            errors={errors}
            handleImageChange={handleImageChange}
          />

          <StoreTag tagInputRef={tagInputRef} control={control} />

          <StoreOperationTime register={register} errors={errors} />

          <div className="flex items-center justify-center mt-9">
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 mr-6"
            >
              등록
            </button>
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
            >
              닫기
            </button>
          </div>
        </form>
      </article>
    </div>
  );
};

export default StoreRegistrationModal;
