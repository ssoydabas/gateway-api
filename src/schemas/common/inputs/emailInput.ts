import { z } from 'zod';

export const emailInput = z.object({
  email: z.string().email(),
});

export type EmailInput = z.infer<typeof emailInput>;
