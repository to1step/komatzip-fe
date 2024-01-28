import { Controller, Control } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';

interface StoreTagProps {
  tagInputRef: React.RefObject<HTMLInputElement>;
  control: Control<CreateStoreForm>;
}

const StoreTag: React.FC<StoreTagProps> = ({ tagInputRef, control }) => (
  <label className="mt-4 block">
    <h3 className="text-lg font-semibold mb-2">태그</h3>
    <Controller
      name="tags"
      control={control}
      defaultValue={[]}
      rules={{ required: false }}
      render={({ field, fieldState }) => (
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
          {fieldState?.error && (
            <p className="text-red-500 mt-2 flex justify-center">
              {fieldState.error.message}
            </p>
          )}
          <ul className="flex flex-wrap mt-2">
            {field.value.map((tag: string, index: number) => (
              <li
                key={index}
                className="border border-yellow-500 px-2 py-1 rounded-full mr-2 mb-2 flex items-center"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => {
                    field.onChange(
                      field.value.filter((_: string, i: number) => i !== index),
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
);

export default StoreTag;
