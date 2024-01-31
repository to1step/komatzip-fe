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
  representImage: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  startTime: z.string().nullable(),
  endTime: z.string().nullable(),
});
