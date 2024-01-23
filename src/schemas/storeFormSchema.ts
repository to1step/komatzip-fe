import { z } from 'zod';

export const createStoreFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '가게 이름을 작성해주세요' })
    .max(20, { message: '가게 이름은 20자를 넘을 수 없습니다.' }),
  category: z
    .number()
    .or(z.undefined())
    .refine((data) => data !== null && data !== undefined, {
      message: '카테고리를 선택해주세요',
    }),

  description: z.string().min(1, { message: '설명을 작성해주세요' }),
  location: z.string().min(1),
  coordinates: z.array(z.number()).refine((data) => data.length === 2),
  representImage: z
    .string()
    .nullable()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: '대표 이미지를 업로드 해주세요',
      },
    ),
});
