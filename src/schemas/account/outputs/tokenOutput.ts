import { z } from 'zod';

export const tokenOutput = z.object({
  token: z.string(),
});

export type TokenOutput = z.infer<typeof tokenOutput>;
