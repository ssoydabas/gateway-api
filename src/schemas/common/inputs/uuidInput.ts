import { z } from 'zod';

export const uuidInput = z.object({
  id: z.string().uuid(),
});

export type UuidInput = z.infer<typeof uuidInput>;
