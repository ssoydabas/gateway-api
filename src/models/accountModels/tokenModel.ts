import { z } from 'zod';

export const tokenModel = z.object({
  token: z.string(),
});

export type TokenModel = z.infer<typeof tokenModel>;
