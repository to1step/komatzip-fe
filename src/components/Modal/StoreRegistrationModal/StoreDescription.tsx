import { FieldValues, UseFormRegister } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreDescriptionProps {
  register: UseFormRegister<CreateStoreForm>;
  errors: Record<string, FieldValues>;
}

const StoreDescription: React.FC<StoreDescriptionProps> = ({
  register,
  errors,
}) => (
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
);

export default StoreDescription;
