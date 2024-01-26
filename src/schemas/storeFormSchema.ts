import { z } from 'zod';

export type CreateStoreForm = z.infer<typeof createStoreFormSchema>;

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

  tags: z
    .array(z.string())
    .refine((data) => data !== null && data !== undefined && data.length > 0, {
      message: '한개 이상의 태그를 작성해 주세요',
    }),

  startTime: z
    .string()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: '오픈시간을 작성해 주세요',
      },
    ),

  endTime: z
    .string()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: '마감시간을 작성해 주세요',
      },
    ),
});
