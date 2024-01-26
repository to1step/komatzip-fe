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
          <label className="mt-4 block">
            <h3 className="text-lg font-semibold mb-2">가게 이름*</h3>
            <input
              type="text"
              {...register('name')}
              placeholder="가게 이름 입력"
              className={`w-full px-3 py-2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 mt-2 flex justify-center">
                {errors.name.message}
              </p>
            )}
          </label>

          <label className="mt-4 block">
            <h3 className="text-lg font-semibold mb-2">카테고리*</h3>
            <Controller
              control={control}
              name="category"
              render={({ field, fieldState }) => (
                <>
                  <div className="flex justify-between items-center px-8">
                    <div className="select">
                      <input
                        type="radio"
                        id="restaurant"
                        value={0}
                        checked={field.value === 0}
                        onChange={() => handleCategoryChange(0)}
                        className="hidden"
                      />
                      <label
                        htmlFor="restaurant"
                        className={`inline-block cursor-pointer h-8 w-24 border border-solid 
              leading-8 text-center font-bold text-base 
              ${
                field.value === 0
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-800'
              }`}
                      >
                        식당
                      </label>
                    </div>

                    <div className="select">
                      <input
                        type="radio"
                        id="cafe"
                        value={1}
                        checked={field.value === 1}
                        onChange={() => handleCategoryChange(1)}
                        className="hidden"
                      />
                      <label
                        htmlFor="cafe"
                        className={`inline-block cursor-pointer h-8 w-24 border border-solid 
              leading-8 text-center font-bold text-base 
              ${
                field.value === 1
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-800'
              }`}
                      >
                        카페
                      </label>
                    </div>

                    <div className="select">
                      <input
                        type="radio"
                        id="park"
                        value={2}
                        checked={field.value === 2}
                        onChange={() => handleCategoryChange(2)}
                        className="hidden"
                      />
                      <label
                        htmlFor="park"
                        className={`inline-block cursor-pointer h-8 w-24 border border-solid 
              leading-8 text-center font-bold text-base 
              ${
                field.value === 2
                  ? 'bg-yellow-400 text-white'
                  : 'bg-white text-gray-800'
              }`}
                      >
                        공원
                      </label>
                    </div>
                  </div>
                  {fieldState?.error && (
                    <p className="text-red-500 mt-2 flex justify-center">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </label>

          <label className="mt-4 block">
            <h3 className="text-lg font-semibold mb-2">설명</h3>
            <input
              type="textarea"
              {...register('description')}
              placeholder="설명 입력"
              className={`w-full px-3 py-2 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 mt-2 flex justify-center">
                {errors.description.message}
              </p>
            )}
          </label>

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

          <label className="mt-4 block">
            <h3 className="text-lg font-semibold mb-2">대표 이미지*</h3>
            <div className=" flex items-center justify-center">
              <div className="relative w-[300px] h-[200px]">
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
                        } w-full h-full overflow-hidden relative`}
                        onClick={() => {
                          const input =
                            document.querySelector<HTMLInputElement>(
                              'input[name="representImage"]',
                            );
                          input?.click();
                        }}
                      >
                        {representImage ? (
                          <img
                            src={representImage}
                            alt="Representative Image"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <p className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              클릭하여 이미지를
                            </p>
                            <p className="text-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-5">
                              업로드해주세요.
                            </p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                />
              </div>
            </div>
            {errors.representImage && (
              <p className="text-red-500 mt-2 flex justify-center">
                {errors.representImage.message}
              </p>
            )}
          </label>

          <label className="mt-4 block">
            <h3 className="text-lg font-semibold mb-2">태그</h3>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              rules={{ required: false }}
              render={({ field }) => (
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <input
                      type="text"
                      placeholder="태그 입력"
                      ref={tagInputRef}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const tag = e.currentTarget.value.trim();
                          if (tag) {
                            field.onChange([...field.value, tag]);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                      className="border border-gray-400 p-2 mr-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (tagInputRef.current) {
                          const tag = tagInputRef.current.value.trim();
                          if (tag) {
                            field.onChange([...field.value, tag]);
                            tagInputRef.current.value = '';
                          }
                        }
                      }}
                      className="bg-yellow-400 text-white p-2 ml-2"
                    >
                      추가
                    </button>
                  </div>
                  {errors.tags && (
                    <p className="text-red-500 mt-2 flex justify-center">
                      {errors.tags.message}
                    </p>
                  )}
                  <ul className="flex flex-wrap mt-2">
                    {field.value.map((tag, index) => (
                      <li
                        key={index}
                        className="border border-yellow-500 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => {
                            field.onChange(
                              field.value.filter((_, i) => i !== index),
                            );
                          }}
                          className="ml-3 text-red-500"
                        >
                          Ｘ
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            />
          </label>

          <h3 className="text-lg font-semibold mb-2 mt-4">운영시간</h3>
          <div className="flex justify-center">
            <label className="mr-2">
              <input
                type="text"
                {...register('startTime')}
                placeholder="시작 시간"
                className={`border-[1px] w-[170px] ${
                  errors.startTime ? 'border-red-500' : 'border-gray-40'
                } px-2 py-1`}
              />
              {errors.startTime && (
                <p className="text-red-500">{errors.startTime.message}</p>
              )}
            </label>

            <span className="text-xl font-bold mx-2">~</span>

            <label className="ml-2">
              <input
                type="text"
                {...register('endTime')}
                placeholder="종료 시간"
                className={`border-[1px] w-[170px] ${
                  errors.endTime ? 'border-red-500' : 'border-gray-40'
                } px-2 py-1`}
              />
              {errors.endTime && (
                <p className="text-red-500">{errors.endTime.message}</p>
              )}
            </label>
          </div>
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
