import { FieldValues, UseFormRegister } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreOperationTimeProps {
  register: UseFormRegister<CreateStoreForm>;
  errors: Record<string, FieldValues>;
}
const StoreOperationTime = ({ register, errors }: StoreOperationTimeProps) => {
  return (
    <label className="mt-4 block">
      <h3 className="text-lg font-semibold mb-2 mt-4">운영시간</h3>
      <div className="flex justify-center">
        <label className="mr-2">
          <input
            type="text"
            {...register('startTime')}
            placeholder="시작 시간"
            className={`border w-40 text-center ${
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
            className={`border w-40 text-center ${
              errors.endTime ? 'border-red-500' : 'border-gray-40'
            } px-2 py-1`}
          />
          {errors.endTime && (
            <p className="text-red-500">{errors.endTime.message}</p>
          )}
        </label>
      </div>
    </label>
  );
};

export default StoreOperationTime;
