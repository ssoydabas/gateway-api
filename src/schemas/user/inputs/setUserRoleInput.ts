import { z } from 'zod';

export const setUserRoleInput = z.object({
  account_id: z.number(),
  role: z.enum(['student', 'teacher', 'admin', 'manager']),
  status: z.enum(['active', 'inactive']),
});

export type SetUserRoleInput = z.infer<typeof setUserRoleInput>;
