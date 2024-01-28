import { FieldValues, UseFormRegister } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreNameProps {
  register: UseFormRegister<CreateStoreForm>;
  errors: Record<string, FieldValues>;
}

const StoreName: React.FC<StoreNameProps> = ({ register, errors }) => (
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
);

export default StoreName;
