import { z } from 'zod';

export const phoneInput = z.object({
  phone: z.string(),
});

export type PhoneInput = z.infer<typeof phoneInput>;
