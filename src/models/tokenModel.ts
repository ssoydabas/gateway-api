import { z } from 'zod';

export const tokenModel = z.object({
  id: z.string().uuid(),
});

export type TokenModel = z.infer<typeof tokenModel>;
