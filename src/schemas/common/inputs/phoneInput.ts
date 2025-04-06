import { z } from 'zod';

export const phoneInput = z.object({
  phone: z.string().regex(/^\+[0-9]{1,3}[0-9]{6,}$/, {
    message: 'Phone number must start with country code (e.g., +90)',
  }),
});

export type PhoneInput = z.infer<typeof phoneInput>;
