import { Controller, Control } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreCategoryProps {
  control: Control<CreateStoreForm>;
}

const StoreCategory: React.FC<StoreCategoryProps> = ({ control }) => (
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
                onChange={() => field.onChange(0)}
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
                onChange={() => field.onChange(1)}
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
                onChange={() => field.onChange(2)}
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
);

export default StoreCategory;
