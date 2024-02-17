import { FieldValues, Controller, Control } from 'react-hook-form';
import { CreateStoreForm } from '@to1step/propose-backend';
interface StoreRepresentImageProps {
  control: Control<CreateStoreForm>;
  name: string;
  defaultValue: string;
  errors: Record<string, FieldValues>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const StoreRepresentImage = ({
  control,
  name,
  defaultValue,
  errors,
  handleImageChange,
}: StoreRepresentImageProps) => {
  return (
    <label className="mt-4 block">
      <h3 className="text-lg font-semibold mb-2">대표 이미지*</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-72 h-48 ">
          <Controller
            control={control}
            name="representImage"
            defaultValue={defaultValue}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageChange(e);
                      field.onChange(URL.createObjectURL(file));
                    }
                  }}
                  className="hidden"
                />
                <div
                  className={`border ${
                    errors.representImage ? 'border-red-500' : 'border-gray-40'
                  } w-full h-full overflow-hidden relative`}
                  onClick={() => {
                    const input = document.querySelector<HTMLInputElement>(
                      `input[name="${name}"]`,
                    );
                    input?.click();
                  }}
                >
                  {field.value ? (
                    <img
                      src={field.value}
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
  );
};

export default StoreRepresentImage;
