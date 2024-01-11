import { z } from 'zod';

export const createStoreFormSchema = z.object({
  name: z.string().min(1).max(20),
  category: z.string(),
  description: z.string().min(1),
  location: z.string().min(1),
  // tags: z.array(z.string()),
  // representImage: z.string().nullable(),
  // startTime: z.string().nullable(),
  // endTime: z.string().nullable(),
});
