import { z } from 'zod';

export const resetPasswordInput = z.object({
  token: z.string(),
  password: z.string(),
  confirm_password: z.string(),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordInput>;
