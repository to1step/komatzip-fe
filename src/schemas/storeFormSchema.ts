import { z } from 'zod';

export const createStoreFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: '가게 이름을 작성해주세요' })
    .max(20, { message: '가게 이름은 20자를 넘을 수 없습니다.' }),
  category: z.number().nullable(),
  description: z.string().min(1, { message: '설명을 작성해주세요' }),
  location: z.string().min(1),
  coordinates: z.array(z.string()).length(2),
  // tags: z.array(z.string()),
  // representImage: z.string().nullable(),
  // startTime: z.string().nullable(),
  // endTime: z.string().nullable(),
});
