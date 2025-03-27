import { z } from 'zod';

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginInput>;
