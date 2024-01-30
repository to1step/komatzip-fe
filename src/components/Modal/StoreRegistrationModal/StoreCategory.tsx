import { Controller, Control } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreCategoryProps {
  control: Control<CreateStoreForm>;
}

const categoryOptions = [
  { id: 'restaurant', label: '식당', value: 0 },
  { id: 'cafe', label: '카페', value: 1 },
  { id: 'park', label: '공원', value: 2 },
];

const StoreCategory = ({ control }: StoreCategoryProps) => (
  <label className="mt-4 block">
    <h3 className="text-lg font-semibold mb-2">카테고리*</h3>
    <Controller
      control={control}
      name="category"
      render={({ field, fieldState }) => (
        <>
          <div className="flex justify-between items-center px-8">
            {categoryOptions.map((option) => (
              <div className="select" key={option.id}>
                <input
                  type="radio"
                  id={option.id}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={() => field.onChange(option.value)}
                  className="hidden"
                />
                <label
                  htmlFor={option.id}
                  className={`inline-block cursor-pointer h-8 w-24 border border-solid 
                  leading-8 text-center font-bold text-base 
                  ${
                    field.value === option.value
                      ? 'bg-yellow-400 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {option.label}
                </label>
              </div>
            ))}
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
