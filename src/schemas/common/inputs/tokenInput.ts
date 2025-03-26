import { z } from 'zod';

export const tokenInput = z.object({
  token: z.string(),
});

export type TokenInput = z.infer<typeof tokenInput>;
