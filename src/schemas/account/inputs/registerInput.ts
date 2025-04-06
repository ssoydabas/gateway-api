import { z } from 'zod';

export const registerInput = z.object({
  first_name: z.string().max(255),
  last_name: z.string().max(255),
  email: z.string().email().max(255),
  phone: z.string().regex(/^\+[0-9]{1,3}[0-9]{6,}$/, {
    message: 'Phone number must start with country code (e.g., +90)',
  }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export type RegisterInput = z.infer<typeof registerInput>;
