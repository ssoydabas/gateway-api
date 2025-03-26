import { z } from 'zod';

export const passwordInput = z.object({
  password: z.string(),
});

export type PasswordInput = z.infer<typeof passwordInput>;
