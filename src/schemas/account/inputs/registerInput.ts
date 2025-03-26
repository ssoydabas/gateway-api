import { z } from 'zod';

export const registerInput = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerInput>;
